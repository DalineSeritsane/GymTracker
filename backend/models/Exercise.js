const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number },
    duration: { type: String },
    rest: { type: String },
    category: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Exercise', ExerciseSchema);
