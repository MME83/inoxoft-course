const {
    CREATE_ACCOUNT,
    UPDATE_ACCOUNT,
    FORGOT_PASSWORD,
    REGISTER_USER
} = require('../common/emailActions.enum');

module.exports = {
    [CREATE_ACCOUNT]: {
        templateName: 'email_create_acc',
        subject: 'Welcome, your personal account was created'
    },

    [REGISTER_USER]: {
        templateName: 'email_reg_acc',
        subject: 'Welcome, thanks for registering in TASK-8'
    },

    [UPDATE_ACCOUNT]: {
        templateName: 'email_update_acc',
        subject: 'Hello, your personal account was modified'
    },

    [FORGOT_PASSWORD]: {
        templateName: 'email_forgot_pass',
        subject: 'Hello, it seems you forgot your password?'
    }
};
