// passport-config.js
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Adjust the path as needed

passport.use(
    new LocalStrategy({ usernameField: 'emailID' }, async (email, password, done) => {
        try {
            // Find user by email
            const user = await User.findOne({ emailID: email });

            // If user not found
            if (!user) {
                console.log('User not found for email:', email);
                return done(null, false, { message: 'User not found' });
            }

            // Validate password
            const isValidPassword = await bcrypt.compare(password, user.password);

            // If password is not correct
            if (!isValidPassword) {
                console.log('Incorrect password for user:', user.emailID);
                return done(null, false, { message: 'Incorrect password' });
            }

            // Authentication successful
            console.log('Authentication successful for user:', user.emailID);
            return done(null, user);
        } catch (err) {
            console.error('Error authenticating user:', err);
            return done(err);
        }
    })
);



passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;

