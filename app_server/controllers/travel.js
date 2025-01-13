/* GET TRAVEL VIEW (BME 1/13/2025)*/
const travel = (req, res) => {
    res.render('travel', {title: "Travelr Getaways"});
};

module.exports = {
    travel
}