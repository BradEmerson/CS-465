// Added (BME 2/18/2025)

require('../models/user'); // Added, with models path updated after troubleshooting (BME 2/18/2025)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await User
        .findOne({ email: username })
        .exec();  // Use `await` instead of a callback, callback was deprecated (BME 2/18/2025)

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

