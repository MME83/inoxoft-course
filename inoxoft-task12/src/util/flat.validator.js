const Joi = require('joi');

const RoomsNumberEnum = require('../common/room-num.enum');
const RegExp = require('../common/regexp.enum');

// JV - Joi validation
const flatByIdJV = Joi.object({
    flat_id: Joi
        .string().trim().regex(RegExp.ID_REGEX)
        .required()
});

const flatBodyJV = Joi.object({
    apt_number: Joi
        .string().trim().min(1).required(),
    apt_total_sm: Joi
        .number().trim().min(1).required(),
    rooms_num: Joi
        .number().min(1).max(1).required()
        .default(RoomsNumberEnum.ONE_ROOM)
        .valid(...Object.values(RoomsNumberEnum)),
    building: Joi
        .string().trim().regex(RegExp.ID_REGEX)
        .required(),
    owners: Joi
        .array()
        .items(Joi.string().trim().regex(RegExp.ID_REGEX).required())
        .required(),
});

const updFlatBodyJV = Joi.object({
    apt_number: Joi
        .string().trim().min(1),
    apt_total_sm: Joi
        .number().trim().min(1),
    rooms_num: Joi
        .number().min(1).max(1)
        .valid(...Object.values(RoomsNumberEnum)),
    building: Joi
        .string().trim().regex(RegExp.ID_REGEX),
    owners: Joi
        .array()
        .items(Joi.string().trim().regex(RegExp.ID_REGEX)),
});

module.exports = {
    flatByIdJV,
    flatBodyJV,
    updFlatBodyJV
};
