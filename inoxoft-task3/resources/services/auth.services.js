const users = require('../../db/users.json');

const getUserIfLogin = (login, password) => users.find((user) => (user.login === login && user.password === password));

module.exports = {
    getUserIfLogin,
};
