var express = require('express');
var router = express.Router();
var Membership = require("../../membership");

module.exports = function(app) {
        /* GET Account page. */
        app.get('/registration', function(req, res, next) {
                res.render('register.ejs');
        });

        app.get('/registration/rules', function(req, res, next) {
                res.render('rules.ejs');
        });

        app.get('/singin', function(req, res, next) {
            var memb = new Membership();
            memb.findUserByName(req.query.username,function(err,result){
                if(err){
                    res.writeHead(400);
                    res.end();
                    return;
                }
                if (result[0] == undefined) {
                    res.writeHead(200);
                    res.end();
                } else {
                   res.writeHead(400);
                   res.end(); 
                }
            });    
        });

        app.post('/singin', function(req, res, next) {
            var memb = new Membership();
            memb.register(req.body,function(result) {
                if(result == true){
                   res.writeHead(200); 
                } else {
                    res.writeHead(400);
                }
                res.end();
            });
        });
    }