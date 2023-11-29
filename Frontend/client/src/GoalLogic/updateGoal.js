const API_ENDPOINT = 'https://miniproject9-backend.onrender.com/v1/api';

const updateGoal = async (selectedGoalId, updatedGoal, fetchGoals, setSelectedGoalId, setUpdatedGoal) => {
  try {
    await fetch(`${API_ENDPOINT}/updateGoal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goalId: selectedGoalId,
        ...updatedGoal,
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

export default updateGoal;
