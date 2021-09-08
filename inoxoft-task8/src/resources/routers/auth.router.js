const router = require('express').Router();

const { authController } = require('../controllers');

const { authMiddleware, userMiddleware } = require('../../middleware');

router.post(
    '/signup',
    userMiddleware.isReqBodyInSignupValid,
    userMiddleware.isEmailExists,
    authController.signUpUser
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
