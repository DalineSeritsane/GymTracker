require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db");



const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://gymfit-tracker.vercel.app/", "http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Connect to MongoDB
connectDB();

// GET /api/exercises route
app.get('/api/exercises', (req, res) => {
  res.status(200).json([
    {
      _id: '1',
      name: 'Bench Press',
      category: 'Chest',
      sets: 3,
      reps: 10,
      weight: 80
    },
    {
      _id: '2',
      name: 'Lifts',
      category: 'Arms',
      sets: 6,
      reps: 8,
      weight: 60
    },
    {
      _id: '3',
      name: 'Push ups',
      category: 'Abs',
      sets: 4,
      reps: 7,
      weight: 20
    },
    {
      _id: '4',
      name: 'Squat',
      category: 'Legs',
      sets: 4,
      reps: 8,
      weight: 100
    }
  ]);
});

// Existing route to add an exercise
app.post('/api/exercises/add-exercise', (req, res) => {
  const newExercise = req.body;
  res.status(200).json(newExercise);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
