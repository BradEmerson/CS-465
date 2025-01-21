// Added filesync import and created trips variable for to parse JSON (BME 1/21/2025)
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET TRAVEL VIEW (BME 1/13/2025)*/
const travel = (req, res) => {
    res.render('travel', {title: "Travelr Getaways", trips});
};

module.exports = {
    travel
}