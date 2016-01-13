/**
 * Created by artem on 08.12.2015.
 */
var express = require('express');
var router = express.Router();
var Membership = require("../../membership");
module.exports = function(app) {
    /* GET Project page. */
    app.get('/project', isLoggedIn, function(req, res) {
        var memb = new Membership();
        memb.getUserProjectById(req.user.id, req.query.id_project, function(result,projectusers) {
                memb.getUserSubprojectsByProjectId(req.user.id, req.query.id_project, function(resultsubprojects) {
                    res.render('projectlist.ejs', {
                        user: req.user, // get the user out of session and pass to template
                        projects: result,
                        subprojects: resultsubprojects,
                        participants:projectusers
                    });
                });
            })
            //.catch(function(error) {
            //     if (error) {
            //         console.log("Conn ERROR in /project:" + error);
            //         res.writeHead(400);
            //         res.end();
            //     }
            // });
    }),

    app.post('/createnewproject',isLoggedIn,function(req,res){
        var memb = new Membership();
        memb.addProject(req.user.id, req.body, function(result) {
            if(result == true){
                res.writeHead(200); 
            } else {
                res.writeHead(400);
            }
            res.end();
        }); 
    })
};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
};