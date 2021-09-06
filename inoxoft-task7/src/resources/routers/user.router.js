const router = require('express').Router();

const user_role = require('../../common/user-role.enum');

const { checkAccessToken } = require('../../middleware/auth.middleware');
const { checkUserRole } = require('../../middleware/role.middleware');
const userMiddleware = require('../../middleware/user.middleware');

const userController = require('../controllers/user.controller');

router.get(
    '/',
    checkAccessToken,
    checkUserRole([user_role.ADMIN]),
    userController.getAllUsers
);

router.post(
    '/',
    checkAccessToken,
    checkUserRole([user_role.ADMIN]),
    userMiddleware.isReqBodyInSignupValid,
    userMiddleware.isEmailExists,
    userController.createUser
);

router.get(
    '/:user_id',
    checkAccessToken,
    checkUserRole([
        user_role.ADMIN,
        user_role.USER
    ]),
    userMiddleware.isUserIdValid,
    userController.getUserById
);

router.patch(
    '/:user_id',
    checkAccessToken,
    checkUserRole([
        user_role.ADMIN,
        user_role.USER
    ]),
    userMiddleware.isUserIdValid,
    userMiddleware.isReqBodyUpdateValid,
    userMiddleware.isUserByIdExists,
    userMiddleware.isEmailExists,
    userController.updateUser
);

router.delete(
    '/:user_id',
    checkAccessToken,
    checkUserRole([user_role.ADMIN]),
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExists,
    userController.deleteUser
);

module.exports = router;
