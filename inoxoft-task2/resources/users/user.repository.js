const users = require('../../db/users');

const getAll = async () => users;

const getByLogin = async (login) => users.find((user) => user.login === login);

module.exports = { 
    getAll, 
    getByLogin, 
    users 
};
