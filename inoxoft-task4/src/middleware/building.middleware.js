// const { Buildings } = require('../resources/models');

const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const asyncWrapper = require('./asyncWrapper');

const { buildingvalidator } = require('../util');
const { getBuildingByEmail } = require('../resources/services/building.services');

module.exports = {

    isReqBodyValid: asyncWrapper(async (req, res, next) => {
        try {
            const value = await buildingvalidator.buildingBodyJV.validateAsync(req.body);

            req.body = value;

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, `${error.details[0].message}`);
        }
    }),

    isEmailUnique: asyncWrapper(async (req, res, next) => {
        const { email } = req.body;

        const building = await getBuildingByEmail(email);

        if (building) throw new CustomError(HttpStatusCode.CONFLICT, `Building with email: ${email} is already exists`);

        next();
    }),

    isBuildingIdValid: asyncWrapper(async (req, res, next) => {
        try {
            await buildingvalidator.buildingIdJV.validateAsync(req.params);

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, `${error.details[0].message}`);
        }
    }),
/*
    isUserByIdExists: asyncWrapper(async (req, res, next) => {
        const { user_id } = req.params;

        const user = await Users.findById(user_id);

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
*/
};
