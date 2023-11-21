// models/NutritionFacts.js
const mongoose = require('mongoose');

const nutritionFactsSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  // Add more fields as needed for nutrition facts
});

const NutritionFacts = mongoose.model('NutritionFacts', nutritionFactsSchema);

module.exports = NutritionFacts;
