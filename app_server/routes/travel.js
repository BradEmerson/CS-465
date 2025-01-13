/* TRAVEL ROUTE (BME 1/13/2025)*/

var express = require('express');
var router  = express.Router();
var controller = require('../controllers/travel');

/* GET travel page (BME 1/13/2025) */
router.get('/', controller.travel);

module.exports = router;