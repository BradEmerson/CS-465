// Added user auth (BME 2/18/2025)

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }

    try {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save();  // Old save function was deprecated, updated (BME 2/18/2025)
        const token = user.generateJwt();
        return res.status(200).json({ token });

    } catch (err) {
        return res.status(400).json(err);
    }
};


const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields required" });
    }

    passport.authenticate('local', (err, user, info) => {
        console.log("Login Error: ", err);
        console.log("Authenticated User: ", user);
        console.log("Auth Info: ", info);

        if (err) {
            return res.status(404).json(err);
        }

        if (user) {
            const token = user.generateJwt(); // Generate JWT before using it (BME 2/19/2025)

            //  Check if request comes from Admin SPA (BME 2/19/2025)
            const isApiRequest = req.headers["accept"]?.includes("application/json");

            if (isApiRequest) {
                //  If the request comes from the SPA, return the token in JSON (BME 2/19/2025)
                return res.status(200).json({ token });
            } else {
                // If request comes from the customer website, store JWT in cookies (BME 2/19/2025)
                res.cookie("jwt", token, { 
                    httpOnly: true, 
                    secure: false,  
                    sameSite: "Strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                return res.status(200).json({ message: "Login successful" });
            }
        } else {
            return res.status(401).json(info);
        }
    })(req, res);
};



module.exports = {
    register,
    login
};
