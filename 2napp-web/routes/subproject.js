var express = require('express');
var router = express.Router();
var Membership = require("../../membership");
module.exports = function(app) {
    /* GET Project page. */
    app.get('/subproject', isLoggedIn, function(req, res) {
        var memb = new Membership();
        memb.getUserSubprojectById(req.user.id, req.query.id_subproject, function(result, subprojectusers) {
            res.render('subproject.ejs', {
                user: req.user, // get the user out of session and pass to template
                subprojects: result,
                participants: subprojectusers
            });
        })
    });

    app.post('/createnewsubproject', isLoggedIn, function(req, res) {
        var memb = new Membership();
        memb.addSubproject(req.user.id, req.body, function(result) {
            if(result == true){
                res.writeHead(200); 
            } else {
                res.writeHead(400);
            }
            res.end();
        }); 
    });
};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
};