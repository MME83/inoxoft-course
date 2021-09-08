const jwt = require('jsonwebtoken');

const {
    SECRET_ACCESS,
    SECRET_REFRESH,
    SECRET_ACTION,
    SECRET_ACTION_PASS
} = require('../../common/config');
const actionTypesEnum = require('../../common/actionTypes.enum');

const { OAuth, Atoken } = require('../models');

const CustomError = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

module.exports = {

    generateTokenPair: () => {
        const access_token = jwt.sign({}, SECRET_ACCESS, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, SECRET_REFRESH, { expiresIn: '31d' });

        return { access_token, refresh_token };
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? SECRET_ACCESS : SECRET_REFRESH;

            jwt.verify(token, secret);
        } catch (err) {
            throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
        }
    },

    createTokenInBd: async (tokenPair, user_id) => {
        const createToken = await OAuth.create({ ...tokenPair, Users: user_id });

        if (!createToken) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Can\'t create tokens pair, try again...');
        }

        process.stdout.write('\n ...new tokens pair created in BD \n\n');
    },

    generateActionToken: (actionType) => {
        let secretWord = '';

        switch (actionType) {
            case actionTypesEnum.FORGOT_PASS:
                secretWord = SECRET_ACTION;
                break;
            case actionTypesEnum.FIRST_PASS:
                secretWord = SECRET_ACTION_PASS;
                break;
            default:
                throw new CustomError(HttpStatusCode.SERVER_ERROR, 'Wrong actionType');
        }

        return jwt.sign({ actionType }, secretWord, { expiresIn: '7d' });
    },

    verifyActionToken: (actionType, actionToken) => {
        let secretWord = '';

        switch (actionType) {
            case actionTypesEnum.FORGOT_PASS:
                secretWord = SECRET_ACTION;
                break;
            case actionTypesEnum.FIRST_PASS:
                secretWord = SECRET_ACTION_PASS;
                break;
            default:
                throw new CustomError(HttpStatusCode.SERVER_ERROR, 'Wrong actionType');
        }

        return jwt.verify(actionToken, secretWord);
    },

    createActionTokenInBd: async (actionToken, user_id) => {
        const createToken = await Atoken.create({ action_token: actionToken, Users: user_id });

        if (!createToken) {
            throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Can\'t create tokens pair, try again...');
        }

        process.stdout.write('\n ...new action token created in BD \n\n');
    },
};
