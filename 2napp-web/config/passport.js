/**
 * Created by artem on 08.12.2015.
 */


var LocalStrategy = require('./passport-strategies/local-strategy');
var FacebookStrategy = require('./passport-strategies/facebook-strategy');
var User = require('user-repo');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        }).
        finally();
    });

    LocalStrategy(passport);
    FacebookStrategy(passport);
}