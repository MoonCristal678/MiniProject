const selectGoal = (e, setSelectedGoalId, goals, setUpdatedGoal) => {
    const selectedId = e.target.value;
    setSelectedGoalId(selectedId);
  
    const selectedGoal = goals.find((goal) => goal._id === selectedId);
  
    setUpdatedGoal(selectedGoal || { name: '', target: '' });
  };
  
  export default selectGoal;
  