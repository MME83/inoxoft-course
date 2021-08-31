const regespEnum = require('../common/regexp.enum');
const HttpStatusCode = require('../common/statusCodes');
const ErrorHandler = require('../errors/errorHandler');

const emailValid = (email) => {
    if (!email) throw new ErrorHandler(HttpStatusCode.BAD_REQUEST, 'Email/login is missing!');

    const isValid = regespEnum.EMAIL_REGEXP.test(email);

    if (!isValid) throw new ErrorHandler(HttpStatusCode.BAD_REQUEST, 'Email is not valid!');

    return true;
};

module.exports = emailValid;
