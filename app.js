require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const airbnbRoutes = require('./routes/airbnbRoutes');
const db = require('./services/dbService');
const path = require('path');
const userRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies
app.use('/api/AirBnBs', airbnbRoutes);

app.use('/api/users', userRoutes);

// Initialize the MongoDB connection
const connectionString = process.env.MONGODB_URI;  // Load from .env file
db.initialize(connectionString).then(() => {
  app.listen(process.env.PORT || 8800, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 8800}`      );
  });
});
