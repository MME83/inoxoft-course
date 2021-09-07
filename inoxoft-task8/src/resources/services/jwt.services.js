const jwt = require('jsonwebtoken');
const { SECRET_ACCESS, SECRET_REFRESH } = require('../../common/config');
const { OAuth } = require('../models');

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
    }
};
