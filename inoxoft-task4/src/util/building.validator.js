const Joi = require('joi');

const RegExp = require('../common/regexp.enum');

module.exports = {
    buildingBodyJV: Joi.object({
        postalcode: Joi
            .number().trim().min(4).max(11),
        city: Joi
            .string().trim().min(3).max(30),
        street: Joi
            .string().trim().min(3).max(30),
        str_number: Joi
            .string().trim().min(1).max(10),
        tel: Joi
            .number().trim().min(7).max(15),
        bank: Joi
            .string().trim().min(3).max(30),
        bank_account: Joi
            .string().trim().min(10).max(30),
        website: Joi
            .string().trim().min(10).max(30),
        email: Joi
            .string()
            .trim()
            .regex(RegExp.EMAIL_REGEXP)
            .required(),
        flats: Joi
            .array,
    }),

    buildingIdJV: Joi.object({
        user_id: Joi
            .string()
            .trim()
            .min(24)
            .max(24)
            .required()
    }),
};
