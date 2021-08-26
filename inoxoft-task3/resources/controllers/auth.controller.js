const User = require('../models/user.model');

const authService = require('../services/auth.services');

const emailValid = require('../../util/emailvalidator');

module.exports = {
    getUserIfLogin: async (req, res) => {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).send({ message: 'Login or password missing.' });
        }

        const emailIsValid = await emailValid(login);

        if (!emailIsValid) {
            return res.status(400).send({ message: 'You have entered an invalid email address!' });
        }

        const user = await authService.getUserIfLogin(login, password);

        if (!user) {
            return res.status(404).end('User not found');
        }

        return res.json(User.toResponse(user));
    }
};
