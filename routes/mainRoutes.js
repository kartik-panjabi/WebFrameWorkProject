const express = require('express');
const router = express.Router();
// Middleware to verify JWT token
const verifyToken = require('../middlewares/veifyToken');
const db = require('../services/dbService');

router.get('/', (req, res) => {
    res.render('mainScreen');
  });
  
 


  // just for checking protected route authentication
  router.use('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'Access granted to protected route', user: req.user });
});

  router.get('/listings', async (req, res) => {
  const { min_price, max_price, type } = req.query;  // Extract query parameters

  // Build the filter query based on the parameters provided
  const filter = {};
  if (min_price) filter.price = { $gte: min_price };  // Min price filter
  if (max_price) filter.price = { ...filter.price, $lte: max_price };  // Max price filter
  if (type) filter.type = type;  // Type filter

  try {
      // Query the database to find listings that match the filter
      const airbnbs = await db.find(filter);

      // Pass the filtered listings to the view
      res.render('listings', { airbnbs });
  } catch (err) {
      console.error('Error retrieving listings:', err);
      res.status(500).send('Error retrieving listings');
  }
});






module.exports = router;
