const { Schema, model } = require('mongoose');
const { ATOKEN, USERS } = require('../../db/dbTablesEnum');

const atokenSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    [USERS]: {
        type: Schema.Types.ObjectId,
        reuired: true,
        ref: USERS
    }
}, { timestamps: true });

module.exports = model(ATOKEN, atokenSchema);
