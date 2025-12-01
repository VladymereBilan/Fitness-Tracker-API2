const express = require('express');
const router = express.Router();
const { validateWorkout } = require('../middleware/validationMiddleware');
const { getWorkouts, addWorkout, updateWorkout, deleteWorkout, patchWorkout } = require('../controllers/workoutController');

// ========================
// Workout Routes
// Base path: /api/v1/workout
// ========================

/**
 * @swagger
 * /api/v1/workout:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     description: Fetch a list of all workouts from the database.
 *     responses:
 *       200:
 *         description: List of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   duration:
 *                     type: integer
 *                   caloriesBurned:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date-time
 */
router.get('/', getWorkouts);

/**
 * @swagger
 * /api/v1/workout:
 *   post:
 *     summary: Add a new workout
 *     tags: [Workouts]
 *     description: Create a new workout entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               duration:
 *                 type: integer
 *               caloriesBurned:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Workout added successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/', validateWorkout, addWorkout);

/**
 * @swagger
 * /api/v1/workout/{id}:
 *   put:
 *     summary: Update an existing workout
 *     tags: [Workouts]
 *     description: Fully update a workout by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               duration:
 *                 type: integer
 *               caloriesBurned:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Workout updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Workout not found.
 */
router.put('/:id', validateWorkout, updateWorkout);

/**
 * @swagger
 * /api/v1/workout/{id}:
 *   patch:
 *     summary: Partially update a workout
 *     tags: [Workouts]
 *     description: Partially update fields of a workout by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caloriesBurned:
 *                 type: integer
 *               duration:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Workout partially updated successfully.
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Workout not found.
 */
router.patch('/:id', patchWorkout);

/**
 * @swagger
 * /api/v1/workout/{id}:
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workouts]
 *     description: Delete a workout by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workout ID.
 *     responses:
 *       200:
 *         description: Workout deleted successfully.
 *       404:
 *         description: Workout not found.
 */
router.delete('/:id', deleteWorkout);

module.exports = router;
