import React, { useState, useEffect } from 'react';
import './App.css';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
  });
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [updatedGoal, setUpdatedGoal] = useState({
    name: '',
    target: '',
  });

  const fetchGoals = async () => {
    try {
      const response = await fetch('https://miniproject8-backend.onrender.com/v1/api/goals');
      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
    }));
  };

  const handleAddGoal = async () => {
    try {
      await fetch('https://miniproject8-backend.onrender.com/v1/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      
      fetchGoals();

    
      setNewGoal({
        name: '',
        target: '',
      });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleSelectGoal = (e) => {
    const selectedId = e.target.value;
    setSelectedGoalId(selectedId);

    const selectedGoal = goals.find((goal) => goal._id === selectedId);

    
    setUpdatedGoal(selectedGoal || { name: '', target: '' });
  };

  const handleUpdateGoal = async () => {
    try {
      await fetch(`https://miniproject8-backend.onrender.com/v1/api/updateGoal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goalId: selectedGoalId,
          name: updatedGoal.name,
          target: updatedGoal.target,
        }),
      });

      
      fetchGoals();

    
      setSelectedGoalId('');
      setUpdatedGoal({
        name: '',
        target: '',
      });
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await fetch(`https://miniproject8-backend.onrender.com/v1/api/deleteGoal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goalId }),
      });

      
      fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return (
    <div className="app-container">
      <h2>Goals</h2>

      <div className="app-section">
        <h3>Add New Goal</h3>
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newGoal.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Target:
            <input
              type="number"
              name="target"
              value={newGoal.target}
              onChange={handleInputChange}
            />
          </label>
        </form>
        <button className="app-button" type="button" onClick={handleAddGoal}>
          Add Goal
        </button>
      </div>

      
      <div className="app-section">
        <h3>Update Goal</h3>
        <label>
          Select Goal:
          <select className="app-button" onChange={handleSelectGoal} value={selectedGoalId}>
            <option value="">Select Goal</option>
            {goals.map((goal) => (
              <option key={goal._id} value={goal._id}>
                {goal.name}
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
            value={updatedGoal.name}
            onChange={(e) => setUpdatedGoal({ ...updatedGoal, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Target:
          <input
            type="number"
            name="target"
            value={updatedGoal.target}
            onChange={(e) => setUpdatedGoal({ ...updatedGoal, target: e.target.value })}
          />
        </label>
        <br />
        <button className="app-button" type="button" onClick={handleUpdateGoal} disabled={!selectedGoalId}>
          Update Goal
        </button>
      </div>

    
      <div className="app-section">
        <h3>Goal List</h3>
        <ul className="app-file-list">
          {goals.map((goal) => (
            <li key={goal._id}>
              <strong>Name:</strong> {goal.name}, <strong>Target:</strong> {goal.target}
              <button className="app-delete-button" onClick={() => handleDeleteGoal(goal._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Goals;
