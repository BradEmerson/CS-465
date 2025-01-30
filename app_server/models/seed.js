// Bring in the DB connection and the Trip schema (BME 1/30/2025)
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

// delete any existing recors, then insert seed data (BME 1/30/2025)
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit (BME 1/30/2025)
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});