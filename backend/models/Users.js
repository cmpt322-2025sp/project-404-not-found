const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    is_verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    salt: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    last_login: {
        type: Date,
        required: true,
        default: () => new Date(),
    }
},{
    timestamps: true,
    collection: 'users',
});

const UserModel = mongoose.model('UserModel',UserModelSchema);
module.exports = UserModel;