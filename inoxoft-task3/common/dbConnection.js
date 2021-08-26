const { promises: fs } = require('fs');

const dbExist = async (dbPath) => {
    try {
        await fs.access(dbPath);
        return process.stdout.write(`DB file by path ${dbPath} exists \n\n`);
    } catch (err) {
        process.stderr(err);
        // console.error(err);
    }
};

module.exports = {
    dbExist,
};
