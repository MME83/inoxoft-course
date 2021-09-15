const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const asyncWrapper = require('./asyncWrapper');

const { flatvalidator } = require('../util');
const { flatService } = require('../resources/services');

module.exports = {

    isReqBodyValid: async (req, res, next) => {
        try {
            const value = await flatvalidator.flatBodyJV.validateAsync(req.body);

            req.body = value;

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, error.details[0].message);
        }
    },

    isFlatIdValid: async (req, res, next) => {
        try {
            await flatvalidator.flatByIdJV.validateAsync(req.params);

            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, error.details[0].message);
        }
    },

    isFlatByIdExists: asyncWrapper(async (req, res, next) => {
        const { flat_id } = req.params;

        const flat = await flatService.getFlatById(flat_id);

        if (!flat) throw new CustomError(HttpStatusCode.NOT_FOUND, 'Flat not found');

        next();
    }),

    isFlatUpdReqBodyValid: async (req, res, next) => {
        try {
            await flatvalidator.updFlatBodyJV.validateAsync(req.body);
            next();
        } catch (error) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, error.details[0].message);
        }
    },
};
