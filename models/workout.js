const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
