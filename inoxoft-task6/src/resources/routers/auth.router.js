const router = require('express').Router();

const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const userMiddleware = require('../../middleware/user.middleware');

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

module.exports = router;
