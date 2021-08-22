const users = require('../../db/users');

const getUserIfLogin = async (login, password) => {    
    const user = await users.find(user => (user.login === login && user.password === password));

    return user;
};

module.exports = {
    getUserIfLogin,
};