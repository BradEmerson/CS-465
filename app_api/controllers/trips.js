// Added trips controller (BME 2/5/2025)

const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    // Uncomment the following line to show results of query
    // on the console
    console.log("Trips Data:", JSON.stringify(q, null, 2)); // Added for debugging, 4th trip not populating after posting (BME 2/15/2025)
    console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// Added new endpoint for filtering trips by code (BME 2/5/2025)
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // No filter, return all records
        .exec();

    // Uncomment the following line to show results of query
    // on the console
    console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips Method (BME 2/15/2025)

const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip ({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: new Date(req.body.start), // Converts type string to type Date, error handling (BME 2/15/2025)
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    })

    const q = await newTrip.save();

    console.log(q);

        if (!q) {
             // Database returned no data (BME 2/15/2025)
             return res
             .status(400)
             .json(err);
        } else { // Return new trip (BME 2/15/2025)
            return res
            .status(201)
            .json(q);
        }
}

// PUT: /trips/:tripCode - Updates an existing trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {

    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 'code': req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

    if (!q) {
        // Database returned no data
        return res
            .status(400)
            .json(err);
    } else { 
        // Return resulting updated trip
        return res
            .status(201)
            .json(q);
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
};
