/**
 * Created by artem on 08.12.2015.
 */


var LocalStrategy = require('./passport-strategies/local-strategy');
var FacebookStrategy = require('./passport-strategies/facebook-strategy');
var User = require('user-repo');
var Membership = require("membership");
var memb = new Membership();

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.authenticationToken);
    });

    // used to deserialize the user
    passport.deserializeUser(function (token, done) {
       memb.findUserByToken(token,done);
    });

    LocalStrategy(passport);
    FacebookStrategy(passport);
};