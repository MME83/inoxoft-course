const bcrypt = require('bcryptjs');

const CustomError = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

const { OAuth } = require('../models');

const userLogin = async (password, bdpass) => {
    const passMatched = await bcrypt.compare(password, bdpass);

    if (!passMatched) throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Login or password wrong');

    return true;
};

const userLogout = async (token) => {
    const tokenDeleted = await OAuth.deleteOne({ access_token: token });

    if (!tokenDeleted) throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Token in DB not found');

    return true;
};

module.exports = {
    userLogin,
    userLogout,
};
