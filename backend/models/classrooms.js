const mongoose = require('mongoose');

const ClassroomModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    students_count: {
        type: Number,
        required: true,
        default: 0,
    }
},{
    timestamps: true,
    collection: 'classrooms',
});

const ClassroomModel = mongoose.model('ClassroomModel',ClassroomModelSchema);
module.exports = ClassroomModel;