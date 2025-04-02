const mongoose = require('mongoose');

const AssignmentModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    class_id: {
        type: String,
        required: false,
        trim: true,
    },
    due_date: {
        type: Date,
        required: true,
        default: 0,
    },
    present_in_view: {
        type: Boolean,
        required: true,
        default: true,
    }
},{
    timestamps: true,
    collection: 'assignments',
});

const AssignmentModel = mongoose.model('AssignmentModel',AssignmentModelSchema);
module.exports = AssignmentModel;