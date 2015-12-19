/**
 * Created by artem on 08.12.2015.
 */

var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {
    /* GET Account page. */
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user,message) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (!user) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end(message);//res.write(message);
                return;
            }
            req.login(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send({
                    success: true,
                    message: 'authentication succeeded'
                });
            });
        })(req, res, next);
    });

    // route for logging out
    app.get('/logout', isLoggedIn, function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};

