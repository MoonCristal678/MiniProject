// updateWorkout.js
const updateWorkout = async (selectedWorkoutId, updatedWorkout, fetchWorkouts, setSelectedWorkoutId, setUpdatedWorkout) => {
    try {
      await fetch(`https://miniproject9-backend.onrender.com/v1/api/updateWorkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workoutId: selectedWorkoutId,
          ...updatedWorkout,
        }),
      });
  
      fetchWorkouts();
  
      setSelectedWorkoutId('');
      setUpdatedWorkout({
        name: '',
        duration: '',
        intensity: '',
      });
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };
  
  export default updateWorkout;
  