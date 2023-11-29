// workout.js
import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  intensity: {
    type: String,
    required: true,
  },
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
