// Added filesync import and created trips variable for to parse JSON (BME 1/21/2025)
//var fs = require('fs');    Commented out per assignment guide (BME 2/5/2025)
//var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8')); Commented out per assignment guide (BME 2/5/2025)

// API Endpoint Work (BME 2/5/2025)
const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {  
    method: 'GET',
      headers: { 
         'Accept': 'application/json'   
    }  
}  

// GET TRAVEL VIEW, Modified for Async Request (BME 2/5/2025)
const travel = async function (req, res, next) {
    console.log('TRAVEL CONTROLLER BEGIN');
    await fetch(tripsEndpoint, options)
    .then(res => res.json()) // Commented out for testing (BME 2/5/2025)
    .then(json => {
        console.log(json);
        let message = null;
        if(!(json instanceof Array)) {
            message = 'API lookup error';
            console.log(message);
            json = [];
        }
        else {
            if(!json.length) {
                message = 'No trips exist in our database!';
                console.log(message);
            }
        }
        res.render('travel', {title: "Travelr Getaways", trips: json});
    })
    .catch(err => res.status(500).send(err.message)); 
    console.log('TRAVEL CONTROLLER AFTER RENDER');
};

module.exports = {
    travel
};