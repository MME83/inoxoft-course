const app = require('./app');

const {
    DB_PATH,
    PORT,
    FADMIN_LOG,
    FADMIN_PAS
} = require('./common/config');

const dbConnection = require('./db/dbConnection');
const { createFirstAdmin } = require('./db/dbCreateFirstAdmin');

const start = async () => {
    try {
        const connect = await dbConnection(DB_PATH);

        if (connect) {
            process.stdout.write('MongoDB connected!\n\n');

            await createFirstAdmin(FADMIN_LOG, FADMIN_PAS);

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
