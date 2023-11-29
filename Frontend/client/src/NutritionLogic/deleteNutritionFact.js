const API_ENDPOINT = 'https://miniproject8-backend.onrender.com/v1/api';

const deleteNutritionFact = async (nutritionFactId, fetchNutritionFacts) => {
  try {
    await fetch(`${API_ENDPOINT}/deleteNutritionFact`, {
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

export default deleteNutritionFact;
