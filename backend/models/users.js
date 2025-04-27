const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    student_id: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    classroom_id: {
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

UserModelSchema.index({ student_id: 1, classroom_id: 1 }, { unique: true });
const UserModel = mongoose.model('UserModel',UserModelSchema);
module.exports = UserModel;