const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const templatesInfo = require('../../templates');
const { EM_LOGIN, EM_PASS, EM_FRONT_URL2 } = require('../../common/config');

const ErrorHandler = require('../../errors/errorHandler');
const HttpStatusCode = require('../../common/statusCodes');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'src/templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EM_LOGIN,
        pass: EM_PASS,
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];
    const contextData = { ...context, frontendURL2: EM_FRONT_URL2 };

    if (!templateToSend) {
        throw new ErrorHandler(HttpStatusCode.SERVER_ERROR, 'Wrong template name');
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, contextData);

    try {
        transporter.sendMail({
            from: 'No reply',
            to: userMail,
            subject,
            html
        });
    } catch (err) {
        throw new ErrorHandler(HttpStatusCode.SERVER_ERROR, err);
    }
};

module.exports = {
    sendMail,
};
