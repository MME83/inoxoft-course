const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');

// get all users
/*router.route('/all').get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
});
*/

// creat new user
router.route('/').post(async (req, res) => {
    
    const userLogin = await usersService.addUser(req.body);

    if (userLogin !== undefined) {
        res.status(302).json({ message: `user with email: ${req.body.login} exist, please add new user or sign-in` });
        return;
    } else {
       // res.status(201).send(User.toResponse(req.body));
        res.status(201).redirect('/login');
    }
});

// get the user by id|login='email'
router.route('/:userLogin').get(async (req, res) => {
    
    const user = await usersService.getByLogin(req.params.userLogin);

    if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
    } else {
        res.json(User.toResponse(user));
    }
});

module.exports = router;