const HttpStatusCode = require('../common/statusCodes');
const ErrorHandler = require('../errors/errorHandler');

const IsBodyValid = (bodyData) => {
    if (!bodyData.name || !bodyData.email || !bodyData.password) {
        throw new ErrorHandler(HttpStatusCode.BAD_REQUEST, 'Name, email or password missing.');
    }

    return true;
};

module.exports = IsBodyValid;
