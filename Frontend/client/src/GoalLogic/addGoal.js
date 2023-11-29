const API_ENDPOINT = 'https://miniproject8-backend.onrender.com/v1/api';

const addGoal = async (newGoal, fetchGoals, setNewGoal) => {
  try {
    await fetch(`${API_ENDPOINT}/goals`, {
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

export default addGoal;
