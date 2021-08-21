const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');

// get all users
router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
});

// get the user by login='email'
router.route('/:userLogin').get(async (req, res) => {
    // const { userLogin } = req.params;
    const user = await usersService.getByLogin(req.params.userLogin);

    if (!user) {
        res.status(404).json({ message: 'user not found' });
    } else {
        res.json(User.toResponse(user));
    }
});

module.exports = router;