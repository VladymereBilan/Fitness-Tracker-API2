const { body, validationResult } = require('express-validator');

// Validation Middleware for workout data
const validateWorkout = [
  body('name').isString().withMessage('Name should be a string').notEmpty(),
  body('type').isString().withMessage('Type should be a string').notEmpty(),
  body('duration').isInt({ min: 1 }).withMessage('Duration should be a positive integer'),
  body('caloriesBurned').optional().isInt({ min: 0 }).withMessage('Calories burned should be a positive integer'),
  
  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateWorkout };
