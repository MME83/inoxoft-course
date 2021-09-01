const app = require('./app');

const { DB_PATH, PORT } = require('./common/config');
const dbConnection = require('./db/dbConnection');

const start = async () => {
    try {
        const connect = await dbConnection(DB_PATH);

        if (connect) {
            process.stdout.write('MongoDB connected!\n\n');

            app.listen(PORT, () => {
                process.stdout.write(`App is running on http://localhost:${PORT}\n\n`);
            });
        }
    } catch (err) {
        console.error(`Failed to Establish Connection with MongoDB with Error: ${err}`);
    }
};

start().catch((err) => {
    console.error(err);
});
