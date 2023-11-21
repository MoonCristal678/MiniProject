// models/Goals.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  target: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  // Add more fields as needed for goals
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
