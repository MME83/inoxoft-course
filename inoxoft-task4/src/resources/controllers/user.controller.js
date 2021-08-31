const User = require('../models/user.model');

const HttpStatusCode = require('../../common/statusCodes');

const userService = require('../services/user.services');

const asyncWrapper = require('../../middleware/asyncWrapper');
const isValid = require('../../util');

module.exports = {

    getAllUsers: asyncWrapper(async (req, res) => {
        const users = await userService.getAll();

        return res.status(HttpStatusCode.OK).json(users.map(User.toResponse));
    }),

    getUserById: asyncWrapper(async (req, res) => {
        const { user_id } = req.params;

        const user = await userService.getUserById(user_id);

        return res.json(User.toResponse(user));
    }),

    createUser: asyncWrapper(async (req, res) => {
        const user = await userService.createUser(req.body);

        return res.status(HttpStatusCode.CREATED).json(User.toResponse(user));
    }),

    updateUser: asyncWrapper(async (req, res) => {
        const { _id } = req.params;

        isValid.IsIdValid(_id);

        const user = await userService.updateUserById(_id, req.body);

        return res.status(HttpStatusCode.OK).json(User.toResponse(user));
    }),

    deleteUser: asyncWrapper(async (req, res) => {
        const { _id } = req.params;

        isValid.IsIdValid(_id);

        await userService.deleteUserById(_id);

        return res.status(HttpStatusCode.OK).send({ message: 'User has deleted' });
    }),
};
