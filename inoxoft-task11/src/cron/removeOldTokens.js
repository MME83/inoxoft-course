const dayjs = require('dayjs');

const { OAuth, Atoken } = require('../resources/models');

module.exports = async () => {
    const previousMonth = dayjs().subtract(1, 'month');

    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await Atoken.deleteMany({ createdAt: { $lte: previousMonth } });
};
