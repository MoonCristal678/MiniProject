// addWorkout.js
const addWorkout = async (newWorkout, fetchWorkouts, setNewWorkout) => {
    try {
      await fetch('https://miniproject8-backend.onrender.com/v1/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
      });
  
      fetchWorkouts();
  
      setNewWorkout({
        name: '',
        duration: '',
        intensity: '',
      });
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };
  
  export default addWorkout;
  