const regespEnum = require('../common/regexp.enum');
const HttpStatusCode = require('../common/statusCodes');
const ErrorHandler = require('../errors/errorHandler');

const isPassValid = (password) => {
    if (!password) throw new ErrorHandler(HttpStatusCode.BAD_REQUEST, 'Password is missing!');

    let pass = true;

    for (let i = 0; i < regespEnum.PASS_REGEXP.length; i++) {
        const rule = regespEnum.PASS_REGEXP[i];

        if (!rule.exp.test(password)) {
            pass = false;

            throw new ErrorHandler(HttpStatusCode.BAD_REQUEST, `Password ${rule.msg}`);
        }
    }

    if (pass) return true;
};

module.exports = isPassValid;
