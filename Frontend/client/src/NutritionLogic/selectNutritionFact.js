const selectNutritionFact = (e, setSelectedNutritionFactId, nutritionFacts, setUpdatedNutritionFact) => {
    const selectedId = e.target.value;
    setSelectedNutritionFactId(selectedId);
  
    const selectedNutritionFact = nutritionFacts.find((nutritionFact) => nutritionFact._id === selectedId);
  
    setUpdatedNutritionFact(selectedNutritionFact || { name: '', calories: '', protein: '', carbs: '', fat: '' });
  };
  
  export default selectNutritionFact;
  