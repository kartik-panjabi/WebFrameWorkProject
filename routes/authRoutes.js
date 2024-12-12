const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.get('/login', (req, res) => {

    // handle req.query message

    if (req.query.message) {
        res.locals.message = req.query.message;
    }

    res.render('login'); // Ensure the login.ejs file exists in the 'views' directory
  });
  
  //Register Page route
  router.get('/register', (req, res) => {
    res.render('register'); // Ensure the login.ejs file exists in the 'views' directory
  });
// Route to register a new user
router.post('/register', registerUser, (req, res) => {
    res.redirect('/login');
  });


// Route to log in a user and get JWT token
router.post('/login', loginUser);


router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the JWT cookie
  res.status(200).redirect('/');
});

module.exports = router;

