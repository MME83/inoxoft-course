const { hashPassword } = require('../../util');

const { Users } = require('../models');

const ErrorHandler = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

const getAll = async () => {
    const users = await Users.find();

    if (!users || users.length < 1) throw new ErrorHandler(HttpStatusCode.NOT_FOUND, 'No users found');

    return users;
};

const getUserById = async (id) => {
    const user = await Users.findById(id);

    if (!user) throw new ErrorHandler(HttpStatusCode.NOT_FOUND, 'User not found');

    return user;
};

const createUser = async (userData) => {
    const {
        name,
        email,
        password,
        role
    } = userData;

    const hashedPass = await hashPassword(password);
    const newUser = new Users({
        name,
        email,
        password: hashedPass,
        role
    });
    const user = await newUser.save();

    if (!user) throw new ErrorHandler(HttpStatusCode.CONFLICT, 'Can\'t create new User, try again');

    process.stdout.write('\n ...a new user has created \n\n');
    return user;
};

const updateUserById = async (id, data) => {
    let newData = {};

    if (data.password) {
        const hashedPass = await hashPassword(data.password);
        newData = { ...data, password: hashedPass };
    } else {
        newData = data;
    }

    const updatedUser = await Users.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
    });

    if (!updatedUser) throw new ErrorHandler(HttpStatusCode.NOT_FOUND, 'User not found');

    return updatedUser;
};

const deleteUserById = async (id) => {
    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) throw new ErrorHandler(HttpStatusCode.NOT_FOUND, 'User not found');

    process.stdout.write('\n ...user has deleted\n\n');
    return true;
};

module.exports = {
    getAll,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
};
