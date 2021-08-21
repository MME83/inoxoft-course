const User = require('./user.model');
const users = require('../../db/users');

const { promises: fs } = require('fs');

const path = require('path');
const { DB_PATH } = require('../../common/config');
const dbDirPath = path.join(__dirname, `../../${DB_PATH}`);

const getAll = async () => users;

const getByLogin = async (login) => users.find((user) => user.login === login);

const addUser = async (userData) => {
    
    const user = await getByLogin(userData.login);
    
    if (user) {
        return user.login;
    } else {
        users.push(userData);

        await writeToFile(dbDirPath, users);

        process.stdout.write(`\n a new user has added to bd file \n`);
    }
};

const writeToFile = async (dbDirPath, users) => {
    try {
        await fs.writeFile(dbDirPath, JSON.stringify(users, null, 4));
    } catch (err) {
        console.log(err);
    }
};

module.exports = { 
    getAll, 
    getByLogin,
    addUser,
    users 
};
