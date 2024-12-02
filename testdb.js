const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://n01600598:humber@cluster0.rhouy.mongodb.net/sample_airbnb?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

  const fs = require('fs');

  async function fetchAndWriteToFile() {
    const AirBnB = mongoose.model('listingsAndReviews', new mongoose.Schema({}, { strict: false }));
    try {
      const data = await AirBnB.find().limit(5); // Fetch first 5 documents
      fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
      console.log('Data written to output.json');
    } catch (err) {
      console.error('Error fetching AirBnBs:', err);
    }
  }
  
  fetchAndWriteToFile();
  