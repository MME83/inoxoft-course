const Joi = require('joi');

const RegExp = require('../common/regexp.enum');

// JV - Joi validation
module.exports = {
    buildingBodyJV: Joi.object({
        postalcode: Joi
            .number().min(4).max(11),
        city: Joi
            .string().trim().min(3).max(30),
        street: Joi
            .string().trim().min(3).max(30)
            .required(),
        str_number: Joi
            .string().trim().min(1).max(10)
            .required(),
        tel: Joi
            .string().trim().regex(RegExp.PHONE_REGEX),
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
        building_id: Joi
            .string().trim().regex(RegExp.ID_REGEX)
            .required()
    }),
};
