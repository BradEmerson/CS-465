// Added Index route (BME 2/4/2025)

const express = require('express'); // Express app
const router = express.Router();    // Router logic
// const jwt = require('express-jwt'); // This call is deprecated and breaks the program, new call one line below (BME 2/18/2025)
const { expressjwt: jwt } = require('express-jwt'); // (BME 2/18/2025)
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], // Mandatory argument not in guide (BME 2/18/2025)
    userProperty: 'payload'
});

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

// Define route for our trips endpoint
router // Added login endpoint (BME 2/18/2025)
    .route('/login')
    .post(authController.login);
router // Added register endpoint (BME 2/18/2025)
    .route('/register')
    .post(authController.register);
router 
    .route('/trips') // Changed .route('trips') to ('/trips') (BME 2/4/2025)
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // Added auth injection middleware (BME 2/18/2025)
    
// Added logout route (BME 2/19/2025)
router
    .post("/logout", (req, res) => {
        res.cookie("jwt", "", { expires: new Date(0), httpOnly: true }); // Expire JWT (BME 2/19/2025)
        res.status(200).json({ message: "Logged out successfully" });
});
    

// GET Method routes tripsFindByCode - requires parameter (BME 2/4/2025)
// Experimenting with line breaks and syntax to better understand JS (BME 2/5/2025)
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip); // Added auth injection middleware (BME 2/18/2025)

module.exports = router;
