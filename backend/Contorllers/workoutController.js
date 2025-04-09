const Workout = require("../models/Workout");
const Exercise = require("../models/Exercise");
const mongoose = require("mongoose");

//  Add a New Workout
exports.addWorkout = async (req, res) => {
    try {
        const { name, exercises, category, duration, difficulty } = req.body;

        // Validate required fields
        if (!name || !exercises || exercises.length === 0) {
            return res.status(400).json({ message: "Workout name and exercises are required." });
        }

        // Validate if exercises exist in DB
        const exerciseIds = exercises.map((ex) => ex.exerciseId);
        const existingExercises = await Exercise.find({ _id: { $in: exerciseIds } });

        if (existingExercises.length !== exercises.length) {
            return res.status(400).json({ message: "One or more exercises do not exist." });
        }

        // Create new workout
        const newWorkout = new Workout({ name, exercises, category, duration, difficulty });
        const savedWorkout = await newWorkout.save();

        res.status(201).json({ message: "Workout added successfully!", workout: savedWorkout });
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    }
};

//  Get All Workouts
exports.getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find().populate("exercises.exerciseId", "name category");

        if (workouts.length === 0) {
            return res.status(404).json({ message: "No workouts found." });
        }

        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving workouts", error: error.message });
    }
};

//  Get Workout by ID
exports.getWorkoutById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid workout ID." });
        }

        const workout = await Workout.findById(id).populate("exercises.exerciseId", "name category");

        if (!workout) {
            return res.status(404).json({ message: "Workout not found." });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving workout", error: error.message });
    }
};

//  Update Workout
exports.updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, exercises, category, duration, difficulty } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid workout ID." });
        }

        const updatedWorkout = await Workout.findByIdAndUpdate(
            id,
            { name, exercises, category, duration, difficulty },
            { new: true, runValidators: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ message: "Workout not found." });
        }

        res.status(200).json({ message: "Workout updated successfully!", workout: updatedWorkout });
    } catch (error) {
        res.status(500).json({ message: "Error updating workout", error: error.message });
    }
};

//  Delete Workout
exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid workout ID." });
        }

        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return res.status(404).json({ message: "Workout not found." });
        }

        res.status(200).json({ message: "Workout deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workout", error: error.message });
    }
};
