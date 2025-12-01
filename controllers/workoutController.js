const Workout = require('../models/workout');

// Get all workouts
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts' });
  }
};

// Get a single workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Invalid workout ID' });
  }
};

// Add a new workout
const addWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.status(201).json({ message: 'Workout added successfully!', workout: newWorkout });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout' });
  }
};

// Update a workout (Full update)
const updateWorkout = async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json({ message: 'Workout updated successfully!', workout: updated });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update workout' });
  }
};

// PATCH - Partially update a workout (e.g., updating caloriesBurned, duration)
const patchWorkout = async (req, res) => {
  try {
    // Find the workout by ID and apply the partial update
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body, 
      { new: true, runValidators: true }
    );

    // If workout is not found, return a 404 error
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Return the updated workout
    res.status(200).json({
      message: 'Workout partially updated successfully!',
      workout: updatedWorkout
    });
  } catch (error) {
    // Handle any errors during the update
    res.status(400).json({ message: 'Failed to partially update workout' });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid workout ID' });
  }
};

// Get simple workout statistics (count and total duration)
const getWorkoutStats = async (req, res) => {
  try {
    const [count, totalDuration] = await Promise.all([
      Workout.countDocuments(),
      Workout.aggregate([
        { $group: { _id: null, totalDuration: { $sum: '$duration' } } },
      ]),
    ]);

    const duration = totalDuration[0]?.totalDuration || 0;

    res.status(200).json({
      totalWorkouts: count,
      totalDurationMinutes: duration,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workout statistics' });
  }
};

module.exports = {
  getWorkouts,
  getWorkoutById,
  addWorkout,
  updateWorkout,
  patchWorkout,
  deleteWorkout,
  getWorkoutStats,
};
