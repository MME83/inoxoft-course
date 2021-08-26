const path = require('path');

const app = require('./app');

const { DB_PATH, PORT } = require('./common/config');
const { dbExist } = require('./common/dbConnection');

const dbDirPath = path.join(__dirname, DB_PATH);

const start = async () => {
    await dbExist(dbDirPath);

    app.listen(PORT, () => {
        process.stdout.write(`App is running on http://localhost:${PORT}\n`);
    });
};

start().catch(process.stderr);
