const HttpStatusCode = require('../common/statusCodes');
const ErrorHandler = require('../errors/errorHandler');

const isIdValid = (id) => {
    if (!id || id.length !== 24) {
        throw new ErrorHandler(HttpStatusCode.BAD_REQUEST, 'Entity id is not valid');
    }
};

module.exports = isIdValid;
