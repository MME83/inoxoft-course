const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const asyncWrapper = require('./asyncWrapper');

const { getUserByEmail, getUserById } = require('../resources/services/user.services');
const { uservalidator } = require('../util');

module.exports = {

    isReqBodyInSignupValid: asyncWrapper(async (req, res, next) => {
        try {
            const value = await uservalidator.createUserValidator.validateAsync(req.body);

            req.body = value;

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, `${error.details[0].message}`);
        }
    }),

    isEmailExists: asyncWrapper(async (req, res, next) => {
        const { email } = req.body;

        const user = await getUserByEmail({ email });

        if (user) throw new CustomError(HttpStatusCode.CONFLICT, `The email: ${email} is already exists`);

        next();
    }),

    isUserByLoginExists: asyncWrapper(async (req, res, next) => {
        const { login } = req.body;

        const user = await getUserByEmail({ email: `${login}` });

        if (!user) throw new CustomError(HttpStatusCode.NOT_FOUND, 'User not found');

        req.user = user;

        next();
    }),

    isUserIdValid: asyncWrapper(async (req, res, next) => {
        try {
            await uservalidator.getUserByIdValidator.validateAsync(req.params);

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, `${error.details[0].message}`);
        }
    }),

    isUserByIdExists: asyncWrapper(async (req, res, next) => {
        const { user_id } = req.params;

        const user = await getUserById(user_id);

        if (!user) throw new CustomError(HttpStatusCode.NOT_FOUND, 'User not found');

        req.user = user;

        next();
    }),

    isReqBodyInLoginValid: asyncWrapper(async (req, res, next) => {
        try {
            const value = await uservalidator.loginUserValidator.validateAsync(req.body);

            req.body = value;

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, `${error.details[0].message}`);
        }
    }),

    isReqBodyUpdateValid: asyncWrapper(async (req, res, next) => {
        try {
            await uservalidator.updateUserValidator.validateAsync(req.body);
            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, `${error.details[0].message}`);
        }
    }),
};
