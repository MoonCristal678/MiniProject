const API_ENDPOINT = 'https://miniproject8-backend.onrender.com/v1/api';

const updateNutritionFact = async (selectedNutritionFactId, updatedNutritionFact, fetchNutritionFacts, setSelectedNutritionFactId, setUpdatedNutritionFact) => {
  try {
    await fetch(`${API_ENDPOINT}/updateNutritionFact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nutritionFactId: selectedNutritionFactId,
        ...updatedNutritionFact,
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

export default updateNutritionFact;
