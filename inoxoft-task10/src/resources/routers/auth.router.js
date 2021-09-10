const router = require('express').Router();

const { authController } = require('../controllers');

const { authMiddleware, userMiddleware } = require('../../middleware');

const actionTypesEnum = require('../../common/actionTypes.enum');

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

router.post(
    '/password/forgot/send',
    userMiddleware.isUserByLoginExists,
    authController.sendMailResetPassword,
);

router.post(
    '/password/forgot/set',
    authMiddleware.validatePassword,
    authMiddleware.checkActionToken(actionTypesEnum.FORGOT_PASS),
    authController.setNewPassword,
);

module.exports = router;
