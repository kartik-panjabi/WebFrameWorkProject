const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login'); // Ensure the login.ejs file exists in the 'views' directory
  });
  
  //Register Page route
  router.get('/register', (req, res) => {
    res.render('register'); // Ensure the login.ejs file exists in the 'views' directory
  });
// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user and get JWT token
router.post('/login', loginUser);

module.exports = router;
