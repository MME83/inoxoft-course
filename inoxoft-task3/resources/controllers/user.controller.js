const User = require('../models/user.model');

const userService = require('../services/user.services');

const emailValid = require('../../util/emailvalidator');

module.exports = {

    getAllUsers: async (req, res) => {
        const users = await userService.getAll();

        return res.status(200).json(users.map(User.toResponse));
    },

    getUserByLogin: async (req, res) => {
        const user = await userService.getUserByLogin(req.params.user_login);

        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        return res.json(User.toResponse(user));
    },

    createUser: async (req, res) => {
        if (!req.body.login || !req.body.password) {
            return res.status(400).send({ message: 'Login or password missing.' });
        }

        const emailIsValid = await emailValid(req.body.login);

        if (!emailIsValid) {
            return res.status(400).send({ message: 'You have entered an invalid email address!' });
        }

        const user = await userService.createUser(req.body);

        if (user !== undefined) {
            return res.status(302).json({
                message: `User with email: ${req.body.login} exist, please change email or try to sign in`
            });
        }

        return res.status(201).json({ message: 'User has created' });
    },
};
