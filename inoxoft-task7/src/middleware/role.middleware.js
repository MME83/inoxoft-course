const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

module.exports = {
    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.userLogged;

            if (!roleArr.length) {
                return next();
            }

            if (!roleArr.includes(role)) {
                throw new CustomError(HttpStatusCode.FORBIDDEN, 'Forbidden');
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
