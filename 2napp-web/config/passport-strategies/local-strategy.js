/**
 * Created by artem on 24.11.2015.
 */

//var users = require("User");
var LocalStrategy = require('passport-local').Strategy;
var Membership = require("../../../membership");

module.exports = function(passport) {
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, function (req, username, password, done) {
            var memb = new Membership();
            memb.authenticate(username, password, function (err, authResult) {
                if (authResult.success) {
                    done(null, authResult.user,null);
                } else {
                    done(null, false,  authResult.message);
                }
            });
        }
    ));
};
