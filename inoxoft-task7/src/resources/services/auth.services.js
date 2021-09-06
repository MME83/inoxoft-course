const bcrypt = require('bcryptjs');

const CustomError = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');
const AOuthModelFieldsEnum = require('../../common/AOuthModelFieldsEnum');

const { OAuth } = require('../models');

const userLogin = async (password, bdpass) => {
    const passMatched = await bcrypt.compare(password, bdpass);

    if (!passMatched) throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Login or password wrong');

    return true;
};

// logout from one device (use access_token: token) or all (use Users: _id)
const userLogout = async (OAuthField = AOuthModelFieldsEnum.AOUTH_FIELD_AT, tokenORid) => {
    if (OAuthField === AOuthModelFieldsEnum.AOUTH_FIELD_AT) {
        const tokenDeleted = await OAuth.deleteOne({ [OAuthField]: tokenORid });

        if (!tokenDeleted) throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Token in DB not found');

        return true;
    }

    const tokenDeleted = await OAuth.deleteMany({ [OAuthField]: tokenORid });

    if (!tokenDeleted) throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Tokens in DB not found');

    return true;
};

const refreshToken = async (refresh_token, token) => {
    const tokenDeleted = await OAuth.deleteOne({ [refresh_token]: token });

    if (!tokenDeleted) throw new CustomError(HttpStatusCode.BAD_REQUEST, 'Token in DB not found');

    return true;
};

module.exports = {
    userLogin,
    userLogout,
    refreshToken,
};
