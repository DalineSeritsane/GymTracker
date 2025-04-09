const express = require("express");
const router = express.Router();
const exerciseController = require('../controllers/exerciseController'); // ✅ Fixed typo in path

// Routes for GET requests
router.get('/exercises', exerciseController.getAllExercises);
router.get('/exercises/new', exerciseController.getAllNewExercises); // ✅ Fixed capitalization
router.get('/exercises/category/:category', exerciseController.getExercisesByCategory); // ✅ Prefixed with /exercises
router.get('/workouts-by-exercise/:exerciseId', exerciseController.getWorkoutsByExercise);


// Routes for POST requests
router.post('/exercises/add-all', exerciseController.addAllExercises); // ✅ Shortened for clarity
router.post('/exercises/add', exerciseController.addExercise); // ✅ Simplified route

// Route for PUT requests
router.put('/exercises/:id', exerciseController.updateExercise);

// Route for DELETE requests
router.delete('/exercises/:id', exerciseController.deleteExercise); // ✅ Ensured consistency with controller function name

module.exports = router;
