const { promises: fs } = require('fs');

const path = require('path');
const users = require('../../db/users.json');
const { DB_PATH } = require('../../common/config');

const dbDirPath = path.join(__dirname, `../../${DB_PATH}`);

const writeToFile = async (_dbDirPath, fileName) => {
    try {
        await fs.writeFile(_dbDirPath, JSON.stringify(fileName, null, 4));
    } catch (err) {
        process.stdout.write(err);
    }
};

const getAll = () => users;

const getUserByLogin = (login) => users.find((user) => user.login === login);

const createUser = async (userData) => {
    const user = await getUserByLogin(userData.login);

    if (user) {
        return user.login;
    }

    users.push(userData);

    await writeToFile(dbDirPath, users);

    process.stdout.write('\n a new user has added to bd file \n');

    return user;
};

module.exports = {
    getAll,
    getUserByLogin,
    createUser,
    users
};
