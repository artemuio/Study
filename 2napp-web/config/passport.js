/**
 * Created by artem on 08.12.2015.
 */


<<<<<<< HEAD
var LocalStrategy = require('./passport-strategies/local-strategy');
var FacebookStrategy = require('./passport-strategies/facebook-strategy');
//var User = require('user-repo');
var Membership = require("../../membership");
var memb = new Membership();
=======
//var LocalStrategy = require('./passport-strategies/local-strategy');
//var FacebookStrategy = require('./passport-strategies/facebook-strategy');
//var User = require('user-repo');
//var Membership = require("membership");
//var memb = new Membership();
>>>>>>> origin/PavlezT-second

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {
    LocalStrategy(passport);
    FacebookStrategy(passport);
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.authenticationToken);
    });

    // used to deserialize the user
    passport.deserializeUser(function (token, done) {
       //memb.findUserByToken(token,done);
    });

<<<<<<< HEAD
=======
    //LocalStrategy(passport);
    //FacebookStrategy(passport);
>>>>>>> origin/PavlezT-second
};