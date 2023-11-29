const API_ENDPOINT = 'https://miniproject8-backend.onrender.com/v1/api';

const deleteGoal = async (goalId, fetchGoals) => {
  try {
    await fetch(`${API_ENDPOINT}/deleteGoal`, {
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

export default deleteGoal;
