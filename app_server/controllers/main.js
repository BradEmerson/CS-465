/* GET HOMEPAGE (BME 1/13/2025)*/
const index = (req, res) => {
    res.render('index', {title: "Travelr Getaways"});
};

module.exports = {
    index
}