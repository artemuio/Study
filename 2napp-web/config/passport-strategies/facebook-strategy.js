/**
 * Created by artem on 24.11.2015.
 */
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../auth');
var Membership = require("membership");

module.exports = function(passport){
    passport.use(new FacebookStrategy({
        clientID:configAuth.facebookAuth.clientID,
        clientSecret:configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'photos'],
        enableProof: true
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            var memb = new Membership();
            memb.externalLogin(profile, done);
        });
    }));
};
