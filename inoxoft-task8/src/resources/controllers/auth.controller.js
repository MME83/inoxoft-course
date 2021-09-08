const { User } = require('../models');

const HttpStatusCode = require('../../common/statusCodes');
const constants = require('../../common/constants');
const emailActionsEnum = require('../../common/emailActions.enum');
const actionTypesEnum = require('../../common/actionTypes.enum');
const { AOUTH_FIELD_UR } = require('../../common/modelsFields.enum');
const { EM_FRONT_URL } = require('../../common/config');

const {
    authService,
    jwtService,
    userService,
    emailService
} = require('../services');

const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = {

    signUpUser: asyncWrapper(async (req, res) => {
        const user = await userService.createUser(req.body);

        if (!user) {
            return res.status(HttpStatusCode.CONFLICT).send({ message: 'Can\'t register new User, try again' });
        }

        await emailService.sendMail(
            user.email,
            emailActionsEnum.REGISTER_USER,
            {
                userName: user.name,
                login: user.email,
                frontendLoginUrl: `${EM_FRONT_URL}/auth/login`,
            }
        );

        return res.status(HttpStatusCode.CREATED).json(User.toResponse(user));
    }),

    userLogin: asyncWrapper(async (req, res) => {
        // login = email - checked for exist with previous middleware in route
        const { password } = req.body;
        const { user } = req;

        await authService.userLogin(password, user.password);

        const tokenPair = jwtService.generateTokenPair();

        await jwtService.createTokenInBd(tokenPair, user._id);

        return res.status(HttpStatusCode.OK).json({
            ...tokenPair,
            user: User.toResponse(user),
        });
    }),

    logout: asyncWrapper(async (req, res) => {
        const token = req.get(constants.AUTHORIZATION);

        await authService.userLogout(token);

        res.status(HttpStatusCode.NO_CONTENT).send('OK');
    }),

    refreshToken: asyncWrapper(async (req, res) => {
        const refresh_token = req.get(constants.AUTHORIZATION);

        const { userLogged } = req;

        const tokenPair = jwtService.generateTokenPair();

        await authService.refreshToken(refresh_token, tokenPair);

        return res.status(HttpStatusCode.OK).json({
            ...tokenPair,
            user: User.toResponse(userLogged),
        });
    }),

    sendMailResetPassword: asyncWrapper(async (req, res) => {
        const { user } = req;

        const actionToken = jwtService.generateActionToken(actionTypesEnum.FORGOT_PASS);

        await jwtService.createActionTokenInBd(actionToken, user._id);

        await emailService.sendMail(
            user.email,
            emailActionsEnum.FORGOT_PASSWORD,
            {
                login: user.email,
                userName: user.name,
                frontendResetPass: `${EM_FRONT_URL}/auth/password/forgot/set?token=${actionToken}`
            }
        );

        return res.status(HttpStatusCode.OK).send('Email for reset password was sent');
    }),

    setNewPassword: asyncWrapper(async (req, res) => {
        const { userLogged, body } = req;

        const action_token = req.get(constants.AUTHORIZATION);

        await userService.updateUserById(userLogged._id, body);
        await authService.deleteActionToken(action_token);
        await authService.userLogout(AOUTH_FIELD_UR, userLogged._id);

        res.send('ok');
    })
};
