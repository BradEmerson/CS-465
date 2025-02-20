/* INDEX ROUTE (BME 1/13/2025)*/

var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const jwt = require("jsonwebtoken"); // Added to middleware auth (BME 2/19/2025)
const authController = require("../../app_api/controllers/authentication"); // Added (BME 2/19/2025)
const Trip = require("../../app_api/models/travlr");


// Middleware to Check Authentication (BME 2/19/2025)
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.jwt; // Retrieve JWT from cookies (BME 2/19/2025)

    if (!token) {
        res.locals.loggedIn = false; // Not logged in (BME 2/19/2025)
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.loggedIn = true;  // Passes 'loggedIn' variable to Handlebars (BME 2/19/2025)
        req.user = decoded;  // Stores user details for later use (BME 2/19/2025)
    } catch (error) {
        res.locals.loggedIn = false;
    }

    next();
};

// Applies Middleware to All Routes (BME 2/19/2025)
router.use(authMiddleware);

// GET Travel Page (Now with 'loggedIn' Variable) (BME 2/19/2025)
router.get("/travel", async (req, res) => {
    try {
        const trips = await Trip.find(); // Debug (BME 2/19/2025)
        console.log("Trips Data:", trips); // Debug (BME 2/19/2025)

        res.render("travel", { 
            trips: trips, // Debug (BME 2/19/2025)
            loggedIn: res.locals.loggedIn // Debug (BME 2/19/2025)
        });

    } catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).send("Error fetching trips");
    }
});


/* GET home page. */
router.get('/', ctrlMain.index);

// GET Register Page (BME 2/19/2025)
router.get("/register", (req, res) => {
    res.render("register");
});

// GET Login Page (BME 2/19/2025)
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", authController.login); // Added (BME 2/19/2025)
router.post("/register", authController.register); // Added (BME 2/19/2025)

module.exports = router;
