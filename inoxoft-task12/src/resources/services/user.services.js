const { hashPassword } = require('../../util');

const { Users } = require('../models');

const getAll = async (queryData = {}) => {
    const {
        perPage = 10,
        page = 1,
        sortBy = 'createdAt',
        order = 'asc',
        ...filters
    } = queryData;

    const skip = (page - 1) * perPage;
    const orderBy = order === 'asc' ? -1 : 1;
    const sort = { [sortBy]: orderBy };

    const filterObject = {};

    Object.keys(filters).forEach((key) => {
        switch (key) {
            case 'role':
                const rolesArr = filters.role.split(';');
                filterObject.role = { $in: rolesArr };
                break;
            case 'email':
                filterObject.email = filters.email;
                break;
            case 'name':
                filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                break;
        }
    });

    const users = await Users
        .find(filterObject)
        .limit(+perPage)
        .skip(skip)
        .sort(sort);

    const count = await Users.countDocuments(filterObject);

    return {
        data: users,
        page,
        limit: +perPage,
        count,
        pageCount: Math.ceil(count / perPage)
    };
};

const getUserById = async (id) => {
    const user = await Users.findById(id);

    return user;
};

const getUserByEmail = async (email) => {
    const user = await Users.findOne(email).exec();

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

    if (user) {
        process.stdout.write('\n ...new user created \n\n');
    }

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

    if (updatedUser) { process.stdout.write('\n ...user was updated \n\n'); }

    return updatedUser;
};

const deleteUserById = async (id) => {
    const deletedUser = await Users.findByIdAndDelete(id);

    if (deletedUser) { process.stdout.write('\n ...user was deleted\n\n'); }

    return true;
};

module.exports = {
    getAll,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById,
};
