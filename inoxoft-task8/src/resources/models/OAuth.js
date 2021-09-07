const { Schema, model } = require('mongoose');
const dbTablesEnum = require('../../db/dbTablesEnum');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [dbTablesEnum.USERS]: {
        type: Schema.Types.ObjectId,
        reuired: true,
        ref: dbTablesEnum.USERS
    }
}, { timestamps: true });

module.exports = model(dbTablesEnum.OAUTH, OAuthSchema);
