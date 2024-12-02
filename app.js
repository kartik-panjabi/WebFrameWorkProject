// server.js
require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const airbnbRoutes = require('./routes/airbnbRoutes');
const db = require('./services/dbService');

const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies
app.use('/api/AirBnBs', airbnbRoutes);

// Initialize the MongoDB connection
const connectionString = process.env.MONGODB_URI;  // Load from .env file
db.initialize(connectionString).then(() => {
  app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
  });
});
