const Joi = require('joi');

const RoomsNumberEnum = require('../common/room-num.enum');
const RegExp = require('../common/regexp.enum');

const getFlatByIdValidator = Joi.object({
    flat_id: Joi
        .string().trim().regex(RegExp.ID_REGEX)
        .required()
});

const createFlatValidator = Joi.object({
    apt_number: Joi
        .string()
        .trim()
        .min(1)
        .required(),
    apt_total_sm: Joi
        .number()
        .trim()
        .min(1)
        .required(),
    rooms_num: Joi
        .number()
        .min(1)
        .max(1)
        .required()
        .default(RoomsNumberEnum.ONE_ROOM)
        .valid(...Object.values(RoomsNumberEnum))
});

module.exports = {
    getFlatByIdValidator,
    createFlatValidator,
};
