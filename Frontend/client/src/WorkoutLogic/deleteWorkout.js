// deleteWorkout.js
const deleteWorkout = async (workoutId, fetchWorkouts) => {
    try {
      await fetch(`https://miniproject9-backend.onrender.com/v1/api/deleteWorkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workoutId }),
      });
  
      fetchWorkouts();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };
  
  export default deleteWorkout;
  