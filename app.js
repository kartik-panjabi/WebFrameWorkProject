require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const airbnbRoutes = require('./routes/airbnbRoutes');
const db = require('./services/dbService');
// Middleware to verify JWT token
const verifyToken = require('./middlewares/veifyToken');
const path = require('path');
const userRoutes = require('./routes/authRoutes');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(upload.none()); 

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

app.get('/', (req, res) => {
  res.render('mainScreen');
});

// error route page with any wrong route
app.get('*', (req, res) => {
  res.render('error');
});


// just for checking protected route authentication
app.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'Access granted to protected route', user: req.user });
});


// Initialize the MongoDB connection
const connectionString = process.env.MONGODB_URI;  // Load from .env file
db.initialize(connectionString).then(() => {
  app.listen(process.env.PORT || 8800, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 8800}`      );
  });
});
//wedk