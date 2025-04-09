const mongoose = require("mongoose");

// Define schema for Workout
const workoutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Workout name is required"],
            trim: true,
            minlength: [3, "Workout name must be at least 3 characters long"]
        },
        exercises: [
            {
                exerciseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Exercise", // Reference to Exercise model
                    required: true
                },
                sets: {
                    type: Number,
                    required: true,
                    min: [1, "Sets must be at least 1"]
                },
                reps: {
                    type: Number,
                    required: true,
                    min: [1, "Reps must be at least 1"]
                },
                rest: {
                    type: String,
                    default: "30 seconds" // Default rest time
                }
            }
        ],
        category: {
            type: String,
            enum: ["fullBody", "upperBody", "lowerBody", "cardio", "strength"],
            required: [true, "Workout category is required"]
        },
        duration: {
            type: Number,
            required: true,
            min: [5, "Duration must be at least 5 minutes"]
        },
        difficulty: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            default: "beginner"
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Create model from schema
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
