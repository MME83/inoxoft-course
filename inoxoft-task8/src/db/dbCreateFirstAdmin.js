const { ADMIN } = require('../common/user-role.enum');

const { Users } = require('../resources/models');

const { hashPassword } = require('../util');

module.exports = {
    createFirstAdmin: async (login, password) => {
        const isAdminExist = await Users.findOne({ role: ADMIN });

        if (isAdminExist) return process.stdout.write('\n...admin already exists in DB\n\n');

        const hashed_pass = await hashPassword(password);

        await Users.create({
            name: 'First Admin',
            email: login,
            password: hashed_pass,
            role: ADMIN
        });

        return process.stdout.write('\n...first admin created in DB\n\n');
    },
};
