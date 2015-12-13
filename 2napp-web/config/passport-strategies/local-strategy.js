/**
 * Created by artem on 24.11.2015.
 */

var users = require("user");
var LocalStrategy = require('passport-local').Strateg
var Membership = require("membership");
module.exports = function(passport) {
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, function (req, username, password, done) {
            var memb = new Membership();
            memb.authenticate(username, password, function (err, authResult) {
                if (authResult.success) {
                    done(null, authResult.user);
                } else {
                    done(null, false, {message: authResult.message});
                }
            });

            //    users.findUserByName(username)
            //        .then(function (result) {
            //            if (!result.length) {
            //                return done(null, false); //,req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            //            }
            //            if (!(result[0].password == password)) {
            //                return done(null, false); //, req.flash('loginMessage', 'Oops! Wrong password.'));
            //            }
            //            return done(null, result[0]);
            //        })
            //        .catch(function (error) {
            //            return done(err);
            //        })
            //        .finally();
        }
    ));
};
