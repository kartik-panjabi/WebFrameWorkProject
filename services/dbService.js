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

// Get all AirBnBs with pagination and filtering
getAllAirBnBs: async (page, perPage, filter) => {
  try {
    // Construct the database query
    console.log(filter);
    const query = AirBnB.find(filter);

    // Apply pagination to the query
    query.skip((page - 1) * perPage).limit(perPage);

    // Execute the database query
    const airbnbs = await query.exec();

    return airbnbs;
  } catch (error) {
    throw new Error('Error fetching AirBnBs: ' + error.message);
  }
},

  // Get an AirBnB by ID
  getAirBnBById: async (Id) => {
    return await AirBnB.findOne({ _id: Id });
  },

  
 getAirBnBFeesById: async (id) => {
  try {
      const airbnb = await AirBnB.findOne({ _id: id }).select( {
          price: 1,
          cleaning_fee: 1,
          security_deposit: 1,
          accommodates: 1,
          extra_people: 1,
          guests_included: 1,
          bedrooms: 1,
          beds: 1,
          "address.street": 1
      });
      if (!airbnb) throw new Error('AirBnB not found');

      const fees = {
          price: airbnb.price || 0,
          cleaning_fee: airbnb.cleaning_fee || 0,
          security_deposit: airbnb.security_deposit || 0,
          accommodates: airbnb.accommodates || 0,
          extra_people: airbnb.extra_people || 0,
          guests_included: airbnb.guests_included || 0,
          bedroom_beds: `${airbnb.bedrooms || 0} bedrooms, ${airbnb.beds || 0} beds`,
          street: airbnb.address?.street || "Not provided"
      };

      return { message: "Fees fetched successfully", fees };
  } catch (err) {
      throw new Error('Error fetching fees: ' + err.message);
  }
},

  // Update an AirBnB by ID
  updateAirBnBById: async (data, Id) => {
    return await AirBnB.findByIdAndUpdate(Id, data, { new: true });
  },

  // Delete an AirBnB by ID
  deleteAirBnBById: async (Id) => {
    return await AirBnB.findByIdAndDelete(Id);
  },

   // get Airbnb by filter 
   find : async (filter) => {
      // sort ascending order filter

      return await AirBnB.find(filter).sort({ price : 1}).limit(10);
   }

};


 
module.exports = db;
