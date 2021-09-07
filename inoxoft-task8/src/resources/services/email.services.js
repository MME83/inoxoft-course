const nodemailer = require('nodemailer');

const { EM_LOGIN, EM_PASS } = require('../../common/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EM_LOGIN,
        pass: EM_PASS,
    }
});

const sendMail = (userMail) => {
    try {
        const sendmail = transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject: 'HELLO WORLD',
            html: '<h1>TEST</h1>'
        });

        if (!sendmail) {
            return console.log('bida');
        }
    } catch (err) {
        throw new Error(500, err);
    }
};

module.exports = {
    sendMail,
};
