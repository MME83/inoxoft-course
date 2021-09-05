const jwt = require('jsonwebtoken');
const { SECRET_ACCESS, SECRET_REFRESH } = require('../../common/config');

const CustomError = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

module.exports = {

    generateTokenPair: () => {
        const accessToken = jwt.sign({}, SECRET_ACCESS, { expiresIn: '15m' });
        const refreshToken = jwt.sign({}, SECRET_REFRESH, { expiresIn: '31d' });

        return { accessToken, refreshToken };
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? SECRET_ACCESS : SECRET_REFRESH;

            jwt.verify(token, secret);
        } catch (err) {
            throw new CustomError(HttpStatusCode.UNAUTHORISED, 'Invalid token');
        }
    },
};
