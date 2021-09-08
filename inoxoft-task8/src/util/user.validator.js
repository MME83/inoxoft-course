const Joi = require('joi');

const userRolesEnum = require('../common/user-role.enum');
const RegExp = require('../common/regexp.enum');

module.exports = {
    regUserValidator: Joi.object({
        name: Joi
            .string().trim().min(3).max(30)
            .required(),
        email: Joi
            .string().trim().regex(RegExp.EMAIL_REGEXP)
            .required(),
        password: Joi
            .string().trim().min(8).max(30)
            .regex(RegExp.PASS_REGEXP)
            .required(),
    }),

    createUserValidator: Joi.object({
        name: Joi
            .string().trim().min(3).max(30)
            .required(),
        email: Joi
            .string().trim().regex(RegExp.EMAIL_REGEXP)
            .required(),
        password: Joi
            .string().trim().min(8).max(30)
            .regex(RegExp.PASS_REGEXP)
            .required(),
        role: Joi
            .string()
            .allow(userRolesEnum.USER, userRolesEnum.ADMIN)
    }),

    loginUserValidator: Joi.object({
        login: Joi
            .string().trim().regex(RegExp.EMAIL_REGEXP)
            .required(),
        password: Joi
            .string().trim().regex(RegExp.PASS_REGEXP)
            .required()
    }),

    getUserByIdValidator: Joi.object({
        user_id: Joi
            .string().trim().regex(RegExp.ID_REGEX)
            .required()
    }),

    updateUserValidator: Joi.object({
        name: Joi
            .string().trim().min(3).max(30),
        email: Joi
            .string().trim().regex(RegExp.EMAIL_REGEXP),
        password: Joi
            .string().trim().regex(RegExp.PASS_REGEXP)
    }),
};
