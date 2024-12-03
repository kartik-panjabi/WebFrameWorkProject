const express = require('express');
const mongoose = require('mongoose');
const db = require('../services/dbService'); // Ensure dbService is correctly implemented
const router = express.Router();

// POST /api/AirBnBs - Add a new AirBnB
router.post('/', async (req, res) => {
  try {
    
res.set("Content-Type", "application/json");
    // Assuming req.body contains the AirBnB data
    const airbnb = await db.addNewAirBnB(req.body);
    res.status(201).json(airbnb);  // Return the created AirBnB object
  } catch (error) {
    res.status(500).json({ message: 'Error adding AirBnB', error });
  }
});

// GET /api/AirBnBs - List AirBnBs with pagination and filtering
// GET /api/AirBnBs - List AirBnBs with pagination and filtering
router.get('/', async (req, res) => {
    const { page = 1, perPage = 5, minimum_nights } = req.query;
  
    // Validate and parse pagination parameters
    const pageNum = parseInt(page, 10);
    const perPageNum = parseInt(perPage, 10);
   
    // Validate pagination parameters
    if (isNaN(pageNum) || isNaN(perPageNum) || pageNum < 1 || perPageNum < 1) {
      return res.status(400).json({ message: 'Invalid pagination parameters' });
    }
  
    // Initialize filter
    const filter = {};
  
    // Check if minimum_nights is provided and is a valid number
    if (minimum_nights) {
      // Ensure minimum_nights is a valid number
       // Convert it to a number
  
      // If the parsed value is a valid number (not NaN)
      if (minimum_nights) {
        filter.minimum_nights = { $gte: minimum_nights };  // Apply the filter
      } else {
        return res.status(400).json({ message: 'Invalid minimum_nights parameter' });
      }
    }
  
    try {
      // Pass the filter directly to db function
      const airbnbs = await db.getAllAirBnBs(pageNum, perPageNum, filter);
      res.status(200).json(airbnbs);  // Return the paginated and filtered list
    } catch (error) {
      res.status(500).json({ message: 'Error fetching AirBnBs', error });
    }
  });
  
// GET /api/AirBnBs/fees/:id
router.get('/fees/:id', async (req, res) => {
  const airbnbId = req.params.id;
  try {
      console.log("fees",airbnbId);
      const fees = await db.getAirBnBFeesById(airbnbId);
      res.status(200).json(fees);
  } catch (err) {
      if (err.message.includes("AirBnB not found")) {
          res.status(404).json({ message: err.message });
      } else {
          res.status(500).json({ message: err.message });
      }
  }
});

// GET /api/AirBnBs/:id - Get a specific AirBnB by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Use findOne and match the string _id
    const airbnb = await db.getAirBnBById(id);
    if (airbnb) {
      res.status(200).json(airbnb);
    } else {
      res.status(404).json({ message: 'AirBnB not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching AirBnB', error });
  }
});

// PUT /api/AirBnBs/:id - Update an existing AirBnB by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  // Ensure the provided ID is a valid actully it is string in mongodb

  
  try {
    const airbnb = await db.updateAirBnBById(data, id);
    if (airbnb) {
      res.status(200).json(airbnb);
    } else {
      res.status(404).json({ message: 'AirBnB not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating AirBnB', error });
  }
});


// DELETE /api/AirBnBs/:id - Delete an existing AirBnB by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Ensure the provided ID is a valid ObjectId
  if (!isValidStringId(id)) {
    return res.status(400).json({ message: 'Invalid AirBnB ID' });
  }

  try {
    const airbnb = await db.deleteAirBnBById(id);
    if (airbnb) {
      res.status(204).send();  // No content response for successful deletion
    } else {
      res.status(404).json({ message: 'AirBnB not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting AirBnB', error });
  }
});





function isValidStringId(id) {
  // Example: Check if the ID is a non-empty string
  return typeof id === 'string' && id.trim().length > 0;
}
module.exports = router;
