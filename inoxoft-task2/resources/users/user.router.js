const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');

// get all users
router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
});

// creat new user
router.route('/').post(async (req, res) => {
    
    const userLogin = await usersService.addUser(req.body);

    if (userLogin !== undefined) {
        res.status(200).json({ message: `user with email: ${req.body.login} exist, please add change it or sign-in` });
    } else {
        res.status(201).send(User.toResponse(req.body));
    }
});

// get the user by login='email'
router.route('/:userLogin').get(async (req, res) => {
    
    const user = await usersService.getByLogin(req.params.userLogin);

    if (!user) {
        res.status(404).json({ message: 'user not found' });
    } else {
        res.json(User.toResponse(user));
    }
});

module.exports = router;