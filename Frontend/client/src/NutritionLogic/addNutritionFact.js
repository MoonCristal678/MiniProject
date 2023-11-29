const API_ENDPOINT = 'https://miniproject9-backend.onrender.com/v1/api';

const addNutritionFact = async (newNutritionFact, setNutritionFacts, setNewNutritionFact) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/nutrition-facts`, {
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

export default addNutritionFact;
