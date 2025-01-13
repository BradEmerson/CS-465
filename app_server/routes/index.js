/* INDEX ROUTE (BME 1/13/2025)*/

var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.index);

module.exports = router;
