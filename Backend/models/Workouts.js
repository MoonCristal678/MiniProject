// models/Workouts.js
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  durationInMinutes: {
    type: Number,
    required: true,
  },
  // Add more fields as needed for workouts
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
