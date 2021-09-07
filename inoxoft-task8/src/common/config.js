const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../../.env')
});

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_PATH: process.env.DB_PATH,
    SALT: process.env.SALT,
    SECRET_ACCESS: process.env.SECRET_ACCESS,
    SECRET_REFRESH: process.env.SECRET_REFRESH,
    FADMIN_LOG: process.env.FADMIN_LOG,
    FADMIN_PAS: process.env.FADMIN_PAS,
    EM_LOGIN: process.env.EM_LOGIN,
    EM_PASS: process.env.EM_PASS
};
