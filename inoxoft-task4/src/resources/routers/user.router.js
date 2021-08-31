const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../../middleware/user.middleware');

router.get('/:user_id', userMiddleware.isUserIdValid, userController.getUserById);
router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.isReqBodyInSignupValid, userMiddleware.isEmailExists, userController.createUser);
router.patch('/:_id', userController.updateUser);
router.delete('/:_id', userController.deleteUser);

module.exports = router;
