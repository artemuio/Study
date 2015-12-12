/**
 * Created by artem on 08.12.2015.
 */

module.exports = function(app, passport) {
    /* GET Account page. */


    app.get('/login', function(req, res, next) {

    });

    // route for logging out
    router.get('/logout', function(req, res, next) {
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