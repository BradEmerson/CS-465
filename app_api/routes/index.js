// Added Index route (BME 2/4/2025)

const express = require('express'); // Express app
const router = express.Router();    // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router
    .route('/trips') // Changed .route('trips') to ('/trips') (BME 2/4/2025)
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(tripsController.tripsAddTrip);

// GET Method routes tripsFindByCode - requires parameter (BME 2/4/2025)
// Experimenting with line breaks and syntax to better understand JS (BME 2/5/2025)
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;
