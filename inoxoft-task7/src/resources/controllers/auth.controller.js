const HttpStatusCode = require('../../common/statusCodes');

const authService = require('../services/auth.services');
const jwtService = require('../services/jwt.services');

const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = {

    userLogin: asyncWrapper(async (req, res) => {
        // login = email
        const { password } = req.body;
        const { user } = req;

        await authService.userLogin(password, user.password);

        const tokenPair = jwtService.generateTokenPair();

        return res.status(HttpStatusCode.OK).json({
            ...tokenPair,
            user: 'Success!'
        });
    }),
};
