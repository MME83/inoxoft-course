const { CREATE_ACCOUNT, UPDATE_ACCOUNT } = require('../common/emailActions.enum');

module.exports = {
    [CREATE_ACCOUNT]: {
        templateName: 'email_create_acc',
        subject: 'Welcome, your personal account was created'
    },

    [UPDATE_ACCOUNT]: {
        templateName: 'email_update_acc',
        subject: 'Hello, your personal account was modified'
    },
};
