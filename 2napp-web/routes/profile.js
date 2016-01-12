var express = require('express');
var router = express.Router();
var Membership = require("../../membership");
module.exports = function(app) {
        /* GET Account page. */
        app.get('/profile', isLoggedIn, function(req, res, next) {
            var memb = new Membership();
            memb.getUserProjects(req.user.id, function(result) {
                res.render('profile.ejs', {
                    user: req.user, // get the user out of session and pass to template
                    projects: result || []
                });
            })
        });

        app.post('/profile', isLoggedIn, function(req, res, next) {
            var memb = new Membership();
            memb.getUserSubprojects(req.user.id, req.body.id_project,function(result) {
                //res.writeHead(200);
                res.send(result);
                //res.end();
            });
        });
    }
    // route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
};