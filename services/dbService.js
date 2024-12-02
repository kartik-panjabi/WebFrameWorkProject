const mongoose = require('mongoose');
const AirBnB = require('../models/airbnbModel');

// Initialize the MongoDB connection
const db = {
  initialize: async (connectionString) => {
    try {
      await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
    }
  },

  // Add a new AirBnB listing
  addNewAirBnB: async (data) => {
    const newAirBnB = new AirBnB(data);
    return await newAirBnB.save();
  },

  // Get all AirBnBs with pagination
  getAllAirBnBs: async () => {
    try {
      // Fetch all AirBnBs without pagination or filtering
      const airbnbs = await AirBnB.find(); // This fetches all documents in the AirBnB collection
      return airbnbs;
    } catch (error) {
      throw new Error('Error fetching AirBnBs: ' + error.message);
    }
  },
  

  // Get an AirBnB by ID
  getAirBnBById: async (Id) => {
    return await AirBnB.findOne({ _id: id });
  },

  // Update an AirBnB by ID
  updateAirBnBById: async (data, Id) => {
    return await AirBnB.findByIdAndUpdate(Id, data, { new: true });
  },

  // Delete an AirBnB by ID
  deleteAirBnBById: async (Id) => {
    return await AirBnB.findByIdAndDelete(Id);
  }
};

module.exports = db;
