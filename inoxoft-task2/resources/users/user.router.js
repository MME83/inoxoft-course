const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');

const emailValid = require('../../util/emailvalidator');

// get all users
/*router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
});
*/

// creat new user
router.route('/').post(async (req, res, next) => {

    if (!req.body.login || !req.body.password) {
        return res.status(400).send({ message: "Login or password missing." });
    }
    
    const emailIsValid = await emailValid(req.body.login);

    if (!emailIsValid) {
        return res.status(400).send({ message: "You have entered an invalid email address!" })
    }
    
    const userLogin = await usersService.addUser(req.body);

    if (userLogin !== undefined) {
        res.status(302).json({ message: `Server-> user with email: ${req.body.login} exist, please change email or try to sign in` });
        return;
    } else {
       // res.status(201).send(User.toResponse(req.body));
        res.status(201).redirect('/login');
    }
});

// get the user by id|login='email'
/*
router.route('/:userLogin').get(async (req, res) => {
    
    const user = await usersService.getByLogin(req.params.userLogin);

    if (!user) {
        res.status(404).json({ message: 'user not found' });
        return;
    } else {
        res.json(User.toResponse(user));
    }
});*/

module.exports = router;