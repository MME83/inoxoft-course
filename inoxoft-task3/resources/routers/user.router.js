const router = require('express').Router();

const userController = require('../controllers/user.controller');

router.get('/:user_login', userController.getUserByLogin);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;
