const User = require('../models/user.model');

const HttpStatusCode = require('../../common/statusCodes');

const authService = require('../services/auth.services');
const jwtService = require('../services/jwt.services');

const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = {

    userLogin: asyncWrapper(async (req, res) => {
        // login = email - checked for exist with previous middleware in route
        const { password } = req.body;
        const { user } = req;

        await authService.userLogin(password, user.password);

        const tokenPair = jwtService.generateTokenPair();

        await jwtService.createTokenInBd(tokenPair, user._id);

        return res.status(HttpStatusCode.OK).json({
            ...tokenPair,
            user: User.toResponse(user),
        });
    }),

    logout: asyncWrapper((req, res) => {
        res.json('OK');
    }),
};
