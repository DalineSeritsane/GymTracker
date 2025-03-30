import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/exercises.css';

const Exercises = () => {
  // State to store exercises fetched from the backend
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState(new Set()); // Using a Set to handle unique selection

  // Fetch exercises from the backend API
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/exercises`);
        setExercises(data); // Populate state with fetched exercises
      } catch (error) {
        console.error('There was an error fetching the exercises!', error);
      }
    };

    fetchExercises();
  }, []); // Empty dependency array ensures the fetch runs only once

  // Handle exercise selection (toggling selection)
  const handleExerciseSelect = (exerciseId) => {
    setSelectedExercises((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(exerciseId)) {
        updatedSelection.delete(exerciseId); // Deselect if already selected
      } else {
        updatedSelection.add(exerciseId); // Select if not already selected
      }
      return updatedSelection;
    });
  };

  return (
    <div className="exercises-page">
      <h2 className="exercises-title">Choose Your Exercises</h2>
      <div className="exercise-grid">
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <div
              key={exercise._id}
              className={`exercise-card ${selectedExercises.has(exercise._id) ? 'selected' : ''}`}
              onClick={() => handleExerciseSelect(exercise._id)}
            >
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>Sets:</strong> {exercise.sets}</p>
              <p><strong>Reps:</strong> {exercise.reps}</p>
              <p><strong>Weight:</strong> {exercise.weight} kg</p>
            </div>
          ))
        ) : (
          <p>No exercises found. Please add exercises in the backend.</p>
        )}
      </div>
    </div>
  );
};

export default Exercises;
