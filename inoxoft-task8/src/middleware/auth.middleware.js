const constants = require('../common/constants');
const dbTablesEnum = require('../db/dbTablesEnum');

const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const { jwtService } = require('../resources/services');
const { OAuth } = require('../resources/models');

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
};
