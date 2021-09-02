const { Schema, model } = require('mongoose');

const RoomsNumberEnum = require('../../common/room-num.enum');

const flatSchema = new Schema({
    apt_number: {
        type: String,
        minlength: 1,
        trim: true,
        unique: true,
        required: true
    },
    apt_total_sm: {
        type: Number,
        minlength: 1,
        trim: true,
        required: true
    },
    rooms_num: {
        type: String,
        minlength: 1,
        maxlength: 1,
        default: RoomsNumberEnum.ONE_ROOM,
        enum: Object.values(RoomsNumberEnum),
        trim: true,
        required: true
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Buildings',
        trim: true,
        required: true,
    },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }],
}, { timestamps: true });

module.exports = model('Flats', flatSchema);
