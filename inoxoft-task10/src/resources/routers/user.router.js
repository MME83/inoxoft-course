const router = require('express').Router();

const user_role = require('../../common/user-role.enum');

const { authMiddleware, roleMiddleware, userMiddleware } = require('../../middleware');

const { userController } = require('../controllers');

router.get(
    '/',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([user_role.ADMIN]),
    userController.getAllUsers
);

router.post(
    '/',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([user_role.ADMIN]),
    userMiddleware.isReqBodyInCreateUserValid,
    userMiddleware.isEmailExists,
    userController.createUser
);

router.get(
    '/:user_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkRoleAndIdAccess(user_role.USER),
    userMiddleware.isUserIdValid,
    userController.getUserById
);

router.patch(
    '/:user_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkRoleAndIdAccess(user_role.USER),
    userMiddleware.isUserIdValid,
    userMiddleware.isReqBodyUpdateValid,
    userMiddleware.isUserByIdExists,
    userMiddleware.isEmailExists,
    userController.updateUser
);

router.delete(
    '/:user_id',
    authMiddleware.checkAccessToken,
    roleMiddleware.checkUserRole([user_role.ADMIN]),
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExists,
    userController.deleteUser
);

module.exports = router;
