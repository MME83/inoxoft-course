const usersRepo = require('./user.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

module.exports = {
    getAll,
};