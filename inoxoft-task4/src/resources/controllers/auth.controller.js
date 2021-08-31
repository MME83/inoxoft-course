const HttpStatusCode = require('../../common/statusCodes');

const authService = require('../services/auth.services');

const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = {

    userLogin: asyncWrapper(async (req, res) => {
        // login = email
        const { password } = req.body;
        const { user } = req;

        await authService.userLogin(password, user.password);

        return res.status(HttpStatusCode.OK).json('Success!');
    }),
};
