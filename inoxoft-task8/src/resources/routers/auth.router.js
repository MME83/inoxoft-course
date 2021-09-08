const router = require('express').Router();

const { authController, userController } = require('../controllers');

const { authMiddleware, userMiddleware } = require('../../middleware');

router.post(
    '/signup',
    userMiddleware.isReqBodyInSignupValid,
    userMiddleware.isEmailExists,
    userController.createUser
);

router.post(
    '/login',
    userMiddleware.isReqBodyInLoginValid,
    userMiddleware.isUserByLoginExists,
    authController.userLogin
);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout,
);

router.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken,
);

module.exports = router;
