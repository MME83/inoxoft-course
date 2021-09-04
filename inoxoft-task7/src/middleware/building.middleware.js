// const { Buildings } = require('../resources/models');

const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const asyncWrapper = require('./asyncWrapper');

const { buildingvalidator } = require('../util');
const { getBuildingByEmail, getBuildingById } = require('../resources/services/building.services');

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

    isBuildingByIdExists: asyncWrapper(async (req, res, next) => {
        const { building_id } = req.params;

        const building = await getBuildingById(building_id);

        if (!building) throw new CustomError(HttpStatusCode.NOT_FOUND, 'Building not found');

        next();
    }),

    isBuildingUpdReqBodyValid: asyncWrapper(async (req, res, next) => {
        try {
            await buildingvalidator.buildingUpdBodyJV.validateAsync(req.body);
            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, `${error.details[0].message}`);
        }
    }),
};
