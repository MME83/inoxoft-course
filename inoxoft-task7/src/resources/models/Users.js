const { Schema, model } = require('mongoose');

const userRolesEnum = require('../../common/user-role.enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    },
    flats: []
}, { timestamps: true });

module.exports = model('Users', userSchema);
