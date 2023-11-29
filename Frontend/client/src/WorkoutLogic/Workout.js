// Workout.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import addWorkout from './addWorkout';
import selectWorkout from './selectWorkout';
import updateWorkout from './updateWorkout';
import deleteWorkout from './deleteWorkout';

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: '',
    intensity: '',
  });
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [updatedWorkout, setUpdatedWorkout] = useState({
    name: '',
    duration: '',
    intensity: '',
  });

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('https://miniproject9-backend.onrender.com/v1/api/workouts');
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value,
    }));
  };

  const handleAddWorkout = () => {
    addWorkout(newWorkout, fetchWorkouts, setNewWorkout);
  };

  const handleSelectWorkout = (e) => {
    selectWorkout(e, setSelectedWorkoutId, workouts, setUpdatedWorkout);
  };

  const handleUpdateWorkout = () => {
    updateWorkout(selectedWorkoutId, updatedWorkout, fetchWorkouts, setSelectedWorkoutId, setUpdatedWorkout);
  };

  const handleDeleteWorkout = (workoutId) => {
    deleteWorkout(workoutId, fetchWorkouts);
  };


  return (
    <div className="app-container">
      <h2>Workouts</h2>

      <div className="app-section">
        <h3>Add New Workout</h3>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newWorkout.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Duration:
            <input
              type="number"
              name="duration"
              value={newWorkout.duration}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Intensity:
            <input
              type="text"
              name="intensity"
              value={newWorkout.intensity}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={handleAddWorkout}>
            Add Workout
          </button>
        </form>
      </div>

    
      <div className="app-section">
        <h3>Update Workout</h3>
        <label>
          Select Workout:
          <select onChange={handleSelectWorkout} value={selectedWorkoutId}>
            <option value="">Select Workout</option>
            {workouts.map((workout) => (
              <option key={workout._id} value={workout._id}>
                {workout.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedWorkout.name}
            onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="number"
            name="duration"
            value={updatedWorkout.duration}
            onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, duration: e.target.value })}
          />
        </label>
        <br />
        <label>
          Intensity:
          <input
            type="text"
            name="intensity"
            value={updatedWorkout.intensity}
            onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, intensity: e.target.value })}
          />
        </label>
        <br />
        <button className="app-button" type="button" onClick={handleUpdateWorkout} disabled={!selectedWorkoutId}>
          Update Workout
        </button>
      </div>

    
      <div className="app-section">
        <h3>Workout List</h3>
        <ul className="app-file-list">
          {workouts.map((workout) => (
            <li key={workout._id}>
              <strong>Name:</strong> {workout.name}, <strong>Duration:</strong> {workout.duration}, <strong>Intensity:</strong> {workout.intensity}
              <button className="app-delete-button" onClick={() => handleDeleteWorkout(workout._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workout;
