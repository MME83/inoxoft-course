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
    SECRET_ACTION: process.env.SECRET_ACTION,
    SECRET_ACTION_PASS: process.env.SECRET_ACTION_PASS,
    FADMIN_LOG: process.env.FADMIN_LOG,
    FADMIN_PAS: process.env.FADMIN_PAS,
    EM_LOGIN: process.env.EM_LOGIN,
    EM_PASS: process.env.EM_PASS,
    EM_FRONT_URL: process.env.EM_FRONT_URL,
    EM_FRONT_URL2: process.env.EM_FRONT_URL2,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
};
