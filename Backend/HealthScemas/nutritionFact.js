// nutritionFact.js
import mongoose from 'mongoose';

const nutritionFactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
});

const NutritionFact = mongoose.model('NutritionFact', nutritionFactSchema);
export default NutritionFact;
