const usersRepo = require('./user.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getByLogin = (login) => usersRepo.getByLogin(login);

module.exports = {
    getAll,
    getByLogin,
};