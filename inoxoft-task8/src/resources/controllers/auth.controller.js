const User = require('../models/user.model');

const HttpStatusCode = require('../../common/statusCodes');
const constants = require('../../common/constants');
const emailActionsEnum = require('../../common/emailActions.enum');

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
            { login: user.email, userName: user.name }
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
        const token = req.get(constants.AUTHORIZATION);

        const { userLogged } = req;

        await authService.refreshToken(token);

        const tokenPair = jwtService.generateTokenPair();

        await jwtService.createTokenInBd(tokenPair, userLogged._id);

        return res.status(HttpStatusCode.OK).json({
            ...tokenPair,
            user: User.toResponse(userLogged),
        });
    }),
};
