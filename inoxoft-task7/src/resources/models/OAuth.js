const { Schema, model } = require('mongoose');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        reuired: true,
        ref: 'Users'
    }
}, { timestamps: true });

module.exports = model('OAuth', OAuthSchema);
