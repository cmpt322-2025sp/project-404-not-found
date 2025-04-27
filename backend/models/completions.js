const mongoose = require('mongoose');

const GameStringSchema = new mongoose.Schema({
    "Dont Drown Bob": { type: Number, default: 0 },
    "Grocery Store": { type: Number, default: 0 },
    "Bob Cleans": { type: Number, default: 0 },
  }, { _id: false });

const CompletionModelSchema = new mongoose.Schema({
    assignment_id: {
        type: String,
        required: true,
        trim: true,
    },
    user_id: {
        type: String,
        required: false,
        trim: true,
    },
    game_string: {
        type: GameStringSchema,
        required: true,
        default: {},
    },
    eggs_collected: {
        type: Number,
        required: true,
        default: 0,
    }
},{
    timestamps: true,
    collection: 'completions',
});

const CompletionModel = mongoose.model('CompletionModel',CompletionModelSchema);
module.exports = CompletionModel;