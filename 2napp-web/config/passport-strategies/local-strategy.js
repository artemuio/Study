/**
 * Created by artem on 24.11.2015.
 */
var users = require("user-repo");
var LocalStrategy = require('passport-local').Strateg

module.exports = function(passport) {
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        users.findUserByName(username)
            .then(function (result) {
                if (!result.length) {
                    return done(null, false); //,req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                if (!(result[0].password == password)) {
                    return done(null, false); //, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                return done(null, result[0]);
            })
            .catch(function (error) {
                return done(err);
            })
            .finally();
    }));
};
