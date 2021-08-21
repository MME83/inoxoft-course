const users = require('../../db/users');

const getAll = async () => users;

module.exports = { getAll, users };
