const cron = require('node-cron');

const removeOldTokens = require('./removeOldTokens');

module.exports = () => {
    cron.schedule('0 1 1,2 * *', () => {
        process.stdout.write(`Cron start at ${new Date().toISOString()}\n`);

        removeOldTokens();

        process.stdout.write(`Cron end at ${new Date().toISOString()}\n`);
    });
};
