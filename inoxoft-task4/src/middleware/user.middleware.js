const { Users } = require('../resources/models');

const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const asyncWrapper = require('./asyncWrapper');

const { uservalidator } = require('../util');

module.exports = {

    isReqBodyInSignupValid: asyncWrapper(async (req, res, next) => {
        const value = await uservalidator.createUserValidator.validateAsync(req.body);

        if (!value) throw new CustomError(HttpStatusCode.BAD_REQUEST, `${value}`);

        req.body = value;

        next();
    }),

    isEmailExists: asyncWrapper(async (req, res, next) => {
        const { email } = req.body;

        const user = await Users.findOne({ email });

        if (user) throw new CustomError(HttpStatusCode.CONFLICT, `The email: ${email} is already exists`);

        next();
    }),

    isUserByLoginExists: asyncWrapper(async (req, res, next) => {
        const { login } = req.body;

        const user = await Users.findOne({ email: `${login}` }).exec();

        if (!user) throw new CustomError(HttpStatusCode.NOT_FOUND, 'User not found');

        req.user = user;

        next();
    }),

    isUserIdValid: asyncWrapper(async (req, res, next) => {
        const value = await uservalidator.getUserByIdValidator.validateAsync(req.params);

        if (!value) throw new CustomError(HttpStatusCode.BAD_REQUEST, `${value}`);

        next();
    }),

    isUserByIdExists: asyncWrapper(async (req, res, next) => {
        const { user_id } = req.params;

        const user = await Users.findById(user_id);

        if (!user) throw new CustomError(HttpStatusCode.NOT_FOUND, 'User not found');

        req.user = user;

        next();
    }),

    isReqBodyInLoginValid: asyncWrapper(async (req, res, next) => {
        const value = await uservalidator.loginUserValidator.validateAsync(req.body);

        if (!value) throw new CustomError(HttpStatusCode.BAD_REQUEST, `${value}`);

        req.body = value;

        next();
    }),

    isReqBodyUpdateValid: asyncWrapper(async (req, res, next) => {
        const value = await uservalidator.updateUserValidator.validateAsync(req.body);

        if (!value) throw new CustomError(HttpStatusCode.BAD_REQUEST, `${value}`);

        next();
    }),
};
