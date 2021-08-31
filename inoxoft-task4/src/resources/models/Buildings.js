const { Schema, model } = require('mongoose');

const buildingSchema = new Schema({
    postalcode: {
        type: Number,
        minlength: 4,
        maxlength: 11,
        trim: true
    },
    town: {
        type: String,
        minlength: 3,
        maxlength: 30,
        trim: true
    },
    street: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    str_number: {
        type: String,
        minlength: 1,
        maxlength: 15,
        trim: true,
        required: true
    },
    tel: {
        type: Number,
        minlength: 7,
        trim: true
    },
    bank: {
        type: String,
        minlength: 3,
        trim: true
    },
    bank_account: {
        type: Number,
        minlength: 10,
        maxlength: 30,
        trim: true
    },
    website: {
        type: String,
        minlength: 5,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    flats: []
}, { timestamps: true });

module.exports = model('Buildings', buildingSchema);
