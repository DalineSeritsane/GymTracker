import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/workout.css";

const Workout = () => {
  const [exerciseData, setExerciseData] = useState({
    name: "",
    sets: 0,
    reps: 0,
    duration: "",
    rest: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [exerciseId, setExerciseId] = useState(null);
  const [newExercises, setNewExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  // Fetch exercises from the backend
  const fetchExercises = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/new-exercises`);
      setNewExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setNewExercises([]);
    }
  };

  // Handle form input changes
  const handleChange = ({ target: { name, value } }) => {
    setExerciseData(prev => ({
      ...prev,
      [name]: name === "sets" || name === "reps" ? parseInt(value, 10) : value,
    }));
  };

  // Submit form (either create or update exercise)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing && exerciseId) {
        await updateExercise();
      } else {
        await addExercise();
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting exercise:", error);
    }
  };

  // Add new exercise
  const addExercise = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/exercises/add-exercise`, exerciseData);
    setNewExercises(prev => [...prev, data]);
  };

  // Update existing exercise
  const updateExercise = async () => {
    const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/exercises/${exerciseId}`, exerciseData);
    setNewExercises(prev => prev.map(ex => (ex._id === exerciseId ? data : ex)));
  };

  // Delete an exercise
  const handleDelete = async (id) => {
    if (!id) return console.error("Invalid exercise ID!");

    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/exercises/${id}`);
      if (response.status === 200) {
        setNewExercises(prev => prev.filter(ex => ex._id !== id));
      } else {
        console.error("Error deleting exercise:", response.data);
      }
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  // Handle editing an exercise
  const handleEdit = (exercise) => {
    setIsEditing(true);
    setExerciseId(exercise._id);
    setExerciseData({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      duration: exercise.duration,
      rest: exercise.rest,
    });
  };

  // Reset form after submission
  const resetForm = () => {
    setExerciseData({
      name: "",
      sets: 0,
      reps: 0,
      duration: "",
      rest: "",
    });
    setIsEditing(false);
    setExerciseId(null);
  };

  return (
    <div className="exercise-section">
      <div className="add-exercise-form">
        <h2>{isEditing ? "Edit Workout" : "Add New Workout"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={exerciseData.name} onChange={handleChange} />
          
          <label htmlFor="sets">Sets:</label>
          <input type="number" id="sets" name="sets" value={exerciseData.sets} onChange={handleChange} />
          
          <label htmlFor="reps">Reps:</label>
          <input type="number" id="reps" name="reps" value={exerciseData.reps} onChange={handleChange} />
          
          <label htmlFor="duration">Duration (Optional):</label>
          <input type="text" id="duration" name="duration" value={exerciseData.duration} onChange={handleChange} />
          
          <label htmlFor="rest">Rest (Optional):</label>
          <input type="text" id="rest" name="rest" value={exerciseData.rest} onChange={handleChange} />
          
          <button className="add-button" type="submit">{isEditing ? "Update Exercise" : "Add Exercise"}</button>
        </form>

        <div className="exercise-list">
          <h3>New Workout:</h3>
          {newExercises.length > 0 ? (
            newExercises.map((exercise) => (
              <div key={exercise._id} className="exercise-item">
                <p>{exercise.name} - {exercise.sets} sets, {exercise.reps} reps</p>
                <span>
                  <button className="edit-button" onClick={() => handleEdit(exercise)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(exercise._id)}>Delete</button>
                </span>
              </div>
            ))
          ) : (
            <p>No workouts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workout;
