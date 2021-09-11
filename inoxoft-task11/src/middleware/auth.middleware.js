const constants = require('../common/constants');
const dbTablesEnum = require('../db/dbTablesEnum');

const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const { jwtService } = require('../resources/services');
const { OAuth, Atoken } = require('../resources/models');

const { uservalidator } = require('../util');

module.exports = {

    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'No token');
            }

            jwtService.verifyToken(token);

            const tokenInDB = await OAuth.findOne({ access_token: token }).populate(dbTablesEnum.USERS);

            if (!tokenInDB) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
            }

            req.userLogged = tokenInDB.Users;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'No token');
            }

            jwtService.verifyToken(token, 'refresh');

            const tokenInDB = await OAuth.findOne({ refresh_token: token }).populate(dbTablesEnum.USERS);

            if (!tokenInDB) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
            }

            req.userLogged = tokenInDB.Users;

            next();
        } catch (err) {
            next(err);
        }
    },

    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const action_token = req.get(constants.AUTHORIZATION);

            if (!action_token) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'No token');
            }

            jwtService.verifyActionToken(actionType, action_token);

            const tokenInDB = await Atoken.findOne({ action_token }).populate(dbTablesEnum.USERS);

            if (!tokenInDB) {
                throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
            }

            req.userLogged = tokenInDB.Users;

            next();
        } catch (err) {
            next(err);
        }
    },

    validatePassword: (req, res, next) => {
        try {
            const { error, value } = uservalidator.passwordValidator.validate(req.body);

            if (error) {
                throw new CustomError(HttpStatusCode.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (err) {
            next(err);
        }
    },
};
