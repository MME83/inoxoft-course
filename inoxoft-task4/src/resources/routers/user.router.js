const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../../middleware/user.middleware');

router.get('/:user_id', userMiddleware.isUserIdValid, userController.getUserById);
router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.isReqBodyInSignupValid, userMiddleware.isEmailExists, userController.createUser);

router.patch(
    '/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isReqBodyUpdateValid,
    userMiddleware.isUserByIdExists,
    userController.updateUser
);

router.delete('/:user_id', userMiddleware.isUserIdValid, userMiddleware.isUserByIdExists, userController.deleteUser);

module.exports = router;
