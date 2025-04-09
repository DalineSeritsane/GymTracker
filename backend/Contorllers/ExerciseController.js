const Exercise = require('../models/Exercise');
const Workout = require("../models/Workout"); // ✅ Added Workout model
const mongoose = require("mongoose");

// ✅ Add multiple exercises to the database
exports.addAllExercises = async (req, res) => {
    try {
        const exercises = req.body;
        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ message: "Invalid or empty exercises data." });
        }

        const result = await Exercise.insertMany(exercises);
        res.status(201).json({ message: "Exercises added successfully!", exercises: result });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Get all exercises
exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving exercises", error: error.message });
    }
};
       

// ✅ Get exercises by category
exports.getExercisesByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        // Find exercises by category
        const exercises = await Exercise.find({ category });
        if (!exercises.length) {
            return res.status(404).json({ message: `No exercises found for category: ${category}` });
        }

        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Add a single exercise
exports.addExercise = async (req, res) => {
    try {
        const { name, sets, reps, duration, category, rest } = req.body;

        if (!name || !sets || !category) {
            return res.status(400).json({ message: "Missing required fields: name, sets, category" });
        }

        const newExercise = new Exercise({ name, sets, reps, duration, category, rest });
        const savedExercise = await newExercise.save();

        res.status(201).json({ message: "Exercise added successfully!", exercise: savedExercise });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Update an exercise by ID
exports.updateExercise = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Exercise ID" });
        }

        const updatedExercise = await Exercise.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedExercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        res.json({ message: "Exercise updated successfully!", exercise: updatedExercise });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Delete an exercise by ID
exports.deleteExercise = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Exercise ID" });
        }

        const deletedExercise = await Exercise.findByIdAndDelete(id);
        if (!deletedExercise) {
            return res.status(404).json({ message: "Exercise not found" });
        }

        res.json({ message: "Exercise deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ✅ Fetch all workouts that contain a specific exercise (BONUS FUNCTION)
exports.getWorkoutsByExercise = async (req, res) => {
    try {
        const { exerciseId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
            return res.status(400).json({ message: "Invalid Exercise ID" });
        }

        const workouts = await Workout.find({ "exercises.exerciseId": exerciseId }).populate("exercises.exerciseId", "name category");

        if (!workouts.length) {
            return res.status(404).json({ message: "No workouts found containing this exercise." });
        }

        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//  Get all exercises (alternative function name)
exports.getAllNewExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        if (!exercises.length) {
            return res.status(404).json({ message: "No exercises found" });
        }
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
