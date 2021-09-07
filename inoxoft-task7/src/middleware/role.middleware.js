const CustomError = require('../errors/errorHandler');
const HttpStatusCode = require('../common/statusCodes');

const user_role = require('../common/user-role.enum');

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

    // roleAcceessById - role access only if Id User = req.param, roleArr - full access on this routes without Id cheking
    checkRoleAndIdAccess: (roleAccessById = user_role.USER, roleArr = [user_role.ADMIN]) => (req, res, next) => {
        try {
            const { role, _id } = req.userLogged;
            const id = req.params.user_id;

            if (roleArr.includes(role)) {
                return next();
            }

            if (role === roleAccessById && String(_id) === id) {
                return next();
            }

            throw new CustomError(HttpStatusCode.FORBIDDEN, 'Forbidden');
        } catch (err) {
            next(err);
        }
    },
};
