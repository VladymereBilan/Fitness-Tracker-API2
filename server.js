require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Swagger Documentation Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness Tracker API',
      version: '1.0.0',
      description: 'A simple API for tracking workouts and progress.',
      contact: {
        name: 'Your Name',
        email: 'youremail@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  apis: [path.join(__dirname, 'routes', '*.js')],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Expose raw OpenAPI spec as JSON (for external/HTML Swagger UIs)
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

// Middleware Setup
app.use(helmet()); // Adds security headers
app.use(cors()); // Enables CORS
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve static assets (e.g., Swagger HTML)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger UI

// Database Connection (MongoDB using Mongoose)
const mongooseConnect = require('./config/db'); // In a separate file for better practice
mongooseConnect();

// Routes
const workoutRoutes = require('./routes/workoutRoutes');

// Mount routes
app.use('/api/v1/workout', workoutRoutes);

// Swagger docs at /docs (serves the static Swagger UI HTML)
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'swagger.html'));
});

// Root Route for '/'
app.get('/', (req, res) => {
  res.send('Welcome to the Fitness Tracker API! Visit /api/v1 for available routes.');
});

// Root Route for /api/v1
app.get('/api/v1', (req, res) => {
  res.json({
    message: '💪 Fitness Tracker API v1 is running!',
    routes: {
      workout: '/api/v1/workout',
      
    },
  });
});

// Error Handling Middleware (for unhandled routes and errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Graceful Shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server...');
  mongoose.disconnect().then(() => {
    console.log('Disconnected from MongoDB');
    process.exit(0);
  });
});

// This is to start your server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
