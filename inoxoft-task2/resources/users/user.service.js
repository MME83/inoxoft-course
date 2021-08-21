const usersRepo = require('./user.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getByLogin = (login) => usersRepo.getByLogin(login);

const addUser = (userData) => usersRepo.addUser(userData);

module.exports = {
    getAll,
    getByLogin,
    addUser
};