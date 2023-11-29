// selectWorkout.js
const selectWorkout = (e, setSelectedWorkoutId, workouts, setUpdatedWorkout) => {
    const selectedId = e.target.value;
    setSelectedWorkoutId(selectedId);
  
    const selectedWorkout = workouts.find((workout) => workout._id === selectedId);
  
    setUpdatedWorkout(selectedWorkout || { name: '', duration: '', intensity: '' });
  };
  
  export default selectWorkout;
  