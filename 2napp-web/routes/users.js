var express = require('express');
var router = express.Router();
var Membership = require("../../membership");
module.exports = function(app) {
    /* GET Project page. */
    app.get('/users', isLoggedIn, function(req, res) {
        var memb = new Membership();
        memb.getUserProjects(req.user.id, function(result, subprojectusers) {
            res.render('users.ejs', {
                user: req.user, // get the user out of session and pass to template
                projects: result,
            });
        })
    })
};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
};