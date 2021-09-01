const User = require('../models/user.model');

const HttpStatusCode = require('../../common/statusCodes');

const userService = require('../services/user.services');

const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = {

    getAllUsers: asyncWrapper(async (req, res) => {
        const users = await userService.getAll();

        if (!users || users.length < 1) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'No users found' });
        }

        return res.status(HttpStatusCode.OK).json(users.map(User.toResponse));
    }),

    getUserById: asyncWrapper(async (req, res) => {
        const { user_id } = req.params;

        const user = await userService.getUserById(user_id);

        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'User not found' });
        }

        return res.json(User.toResponse(user));
    }),

    createUser: asyncWrapper(async (req, res) => {
        const user = await userService.createUser(req.body);

        if (!user) {
            return res.status(HttpStatusCode.CONFLICT).send({ message: 'Can\'t create new User, try again' });
        }

        return res.status(HttpStatusCode.CREATED).json(User.toResponse(user));
    }),

    updateUser: asyncWrapper(async (req, res) => {
        const { user_id } = req.params;

        const user = await userService.updateUserById(user_id, req.body);

        if (!user) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'User not found' });
        }

        return res.status(HttpStatusCode.OK).json(User.toResponse(user));
    }),

    deleteUser: asyncWrapper(async (req, res) => {
        const { user_id } = req.params;

        const deletedUser = await userService.deleteUserById(user_id);

        if (!deletedUser) {
            return res.status(HttpStatusCode.NOT_FOUND).send({ message: 'User not found' });
        }

        return res.status(HttpStatusCode.OK).send({ message: 'User has deleted' });
    }),
};
