import React, { useState, useEffect } from 'react';
import './App.css';

function Nutrition() {
    const [nutritionFacts, setNutritionFacts] = useState([]);
    const [newNutritionFact, setNewNutritionFact] = useState({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
    });
    const [selectedNutritionFactId, setSelectedNutritionFactId] = useState('');
    const [updatedNutritionFact, setUpdatedNutritionFact] = useState({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
    });
  
    const fetchNutritionFacts = async () => {
      try {
        const response = await fetch('https://miniproject8-backend.onrender.com/v1/api/nutrition-facts');
        const data = await response.json();
        setNutritionFacts(data);
      } catch (error) {
        console.error('Error fetching nutrition facts:', error);
      }
    };
  
    useEffect(() => {
      fetchNutritionFacts();
    }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNutritionFact((prevNutritionFact) => ({
      ...prevNutritionFact,
      [name]: value,
    }));
  };

  const handleAddNutritionFact = async () => {
    try {
      const response = await fetch('https://miniproject8-backend.onrender.com/v1/api/nutrition-facts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNutritionFact),
      });
      const data = await response.json();

      setNutritionFacts((prevNutritionFacts) => [...prevNutritionFacts, data.nutritionFact]);
      setNewNutritionFact({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
      });
    } catch (error) {
      console.error('Error adding nutrition fact:', error);
    }
  };

  const handleSelectNutritionFact = (e) => {
    const selectedId = e.target.value;
    setSelectedNutritionFactId(selectedId);

    
    const selectedNutritionFact = nutritionFacts.find((nutritionFact) => nutritionFact._id === selectedId);


    setUpdatedNutritionFact(selectedNutritionFact || { name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const handleUpdateNutritionFact = async () => {
    try {
      await fetch(`https://miniproject8-backend.onrender.com/v1/api/updateNutritionFact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nutritionFactId: selectedNutritionFactId,
          name: updatedNutritionFact.name,
          calories: updatedNutritionFact.calories,
          protein: updatedNutritionFact.protein,
          carbs: updatedNutritionFact.carbs,
          fat: updatedNutritionFact.fat,
        }),
      });

    
      fetchNutritionFacts();

      
      setSelectedNutritionFactId('');
      setUpdatedNutritionFact({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
      });
    } catch (error) {
      console.error('Error updating nutrition fact:', error);
    }
  };

  const handleDeleteNutritionFact = async (nutritionFactId) => {
    try {
      await fetch(`https://miniproject8-backend.onrender.com/v1/api/deleteNutritionFact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nutritionFactId }),
      });

      
      fetchNutritionFacts();
    } catch (error) {
      console.error('Error deleting nutrition fact:', error);
    }
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Nutrition Facts</h2>

      <div className="app-section">
        <h3>Add Nutrition Fact</h3>
        <input
          type="text"
          name="name"
          value={newNutritionFact.name}
          onChange={handleInputChange}
          placeholder="Nutrition Fact Name"
        />
        <input
          type="text"
          name="calories"
          value={newNutritionFact.calories}
          onChange={handleInputChange}
          placeholder="Calories"
        />
        <input
          type="text"
          name="protein"
          value={newNutritionFact.protein}
          onChange={handleInputChange}
          placeholder="Protein"
        />
        <input
          type="text"
          name="carbs"
          value={newNutritionFact.carbs}
          onChange={handleInputChange}
          placeholder="Carbs"
        />
        <input
          type="text"
          name="fat"
          value={newNutritionFact.fat}
          onChange={handleInputChange}
          placeholder="Fat"
        />
        <button className="app-button" onClick={handleAddNutritionFact}>
          Add Nutrition Fact
        </button>
      </div>

      <div className="app-section">
        <h3>Update Nutrition Fact</h3>
        <label>
          Select Nutrition Fact:
          <select className="app-button" onChange={handleSelectNutritionFact} value={selectedNutritionFactId}>
            <option value="">Select Nutrition Fact</option>
            {nutritionFacts.map((nutritionFact) => (
              <option key={nutritionFact._id} value={nutritionFact._id}>
                {nutritionFact.name}
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
            value={updatedNutritionFact.name}
            onChange={(e) => setUpdatedNutritionFact({ ...updatedNutritionFact, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Calories:
          <input
            type="text"
            name="calories"
            value={updatedNutritionFact.calories}
            onChange={(e) => setUpdatedNutritionFact({ ...updatedNutritionFact, calories: e.target.value })}
          />
        </label>
        <br />
        <label>
          Protein:
          <input
            type="text"
            name="protein"
            value={updatedNutritionFact.protein}
            onChange={(e) => setUpdatedNutritionFact({ ...updatedNutritionFact, protein: e.target.value })}
          />
        </label>
        <br />
        <label>
          Carbs:
          <input
            type="text"
            name="carbs"
            value={updatedNutritionFact.carbs}
            onChange={(e) => setUpdatedNutritionFact({ ...updatedNutritionFact, carbs: e.target.value })}
          />
        </label>
        <br />
        <label>
          Fat:
          <input
            type="text"
            name="fat"
            value={updatedNutritionFact.fat}
            onChange={(e) => setUpdatedNutritionFact({ ...updatedNutritionFact, fat: e.target.value })}
          />
        </label>
        <br />
        <button className="app-button" type="button" onClick={handleUpdateNutritionFact} disabled={!selectedNutritionFactId}>
          Update Nutrition Fact
        </button>
      </div>

      <div className="app-section">
        <h3>Nutrition Fact List</h3>
        <ul className="app-file-list">
          {nutritionFacts.map((nutritionFact) => (
            <li key={nutritionFact._id}>
             {nutritionFact.name} - Calories: {nutritionFact.calories}, Protein: {nutritionFact.protein}, Carbs: {nutritionFact.carbs}, Fat: {nutritionFact.fat}
              <button className="app-delete-button" onClick={() => handleDeleteNutritionFact(nutritionFact._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Nutrition;
