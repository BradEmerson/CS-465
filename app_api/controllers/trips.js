// trips.js

const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    const q = await Model.find({}).exec();
    console.log("Trips Data:", JSON.stringify(q, null, 2));
    console.log(q);

    if (!q) {
        return res.status(404).json({ message: 'No trips found' });
    } else {
        return res.status(200).json(q);
    }
};

// Find trips by trip code
const tripsFindByCode = async (req, res) => {
    const q = await Model.find({ 'code': req.params.tripCode }).exec();
    console.log(q);

    if (!q) {
        return res.status(404).json({ message: 'Trip not found' });
    } else {
        return res.status(200).json(q);
    }
};

// POST: /trips Method
const tripsAddTrip = async (req, res) => { // Removed getUser middleware, as it was breaking the app.  It was redundant as the Edit Button does not exist until user is logged in (BME 2/18/2025)
    Trip.create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    })
    .then(trip => {
        return res.status(201).json(trip);
    })
    .catch(err => {
        return res.status(400).json(err); // bad request
    });
};

// PUT: /trips/:tripCode - Updates an existing trip
const tripsUpdateTrip = async (req, res) => { // Removed getUser middleware, as it was breaking the app.  It was redundant as the Edit Button does not exist until user is logged in (BME 2/18/2025)
    Trip.findOneAndUpdate(
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
        },
        { new: true } // To return the updated document
    )
    .then(trip => {
        if (!trip) {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }
        res.send(trip);
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
            });
        }
        return res.status(500).json(err);
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
