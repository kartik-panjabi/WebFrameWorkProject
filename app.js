require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const AirBnB = require('./models/airbnbModel');

const db = require('./services/dbService');

const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const airbnbRoutes = require('./routes/airbnbRoutes');
const userRoutes = require('./routes/authRoutes');
const errorRoutes = require('./routes/errorRoutes');




const multer = require('multer');
const upload = multer();
const app = express();

const cookieParser = require('cookie-parser');
const router = require('./routes/airbnbRoutes');
app.use(cookieParser()); // Add this line before any routes that use cookies


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

app.use('/', mainRoutes);

app.use('/api/AirBnBs', airbnbRoutes);

app.use('/api/users', userRoutes);

const bodyParser = require("body-parser");
const qs = require("qs");

app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 10000,
    limit: '10mb',
    extended: true,
    type: (req) => qs.parse(req.body),
}));

// last route error routes: 
app.use('/', errorRoutes);

// Initialize the MongoDB connection
const connectionString = process.env.MONGODB_URI;  // Load from .env file
db.initialize(connectionString).then(() => {
  app.listen(process.env.PORT || 8800, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 8800}`      );
  });
});
//wedk