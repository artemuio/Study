/**
 * Created by artem on 12.12.2015.
 */
var User = require('./models/user');
var Authentication = require('./lib/authentication');
var Registration = require('./lib/registration');
var Project = require('./lib/addingproject');
var Subproject = require('./lib/addingsubproject');
var Database = require("../2napp-db");
var forEach = require('async-foreach').forEach;


var Membership = function(){
    var self = this;
    var db = new Database();

    self.authenticate = function(username, password, next){

        var auth = new Authentication();

        db.user.findUserByName(username,function(err,result){
            auth.applyForMembership(result,password,next);
           //return next(null,{success:false,authenticationToken:"Asd"})
        });
    };

    self.externalLogin = function(profile, next){
        // check if the user is already logged in
        if (!req.user) {

            // find the user in the database based on their facebook id
            User.findOne({'facebook.id': profile.id}, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id = profile.id; // set the users facebook id
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });

        }
        else {
            // user already exists and is logged in, we have to link accounts
            var user = req.user; // pull the user out of the session

            // update the current users facebook credentials
            user.facebook.id = profile.id;
            user.facebook.token = token;
            user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;

            // save the user
            user.save(function (err) {
                if (err)
                    throw err;
                return done(null, user);
            });
        }
    };


    self.findUserByName = function(username,next){
        db.user.findUserByName(username,function(err,result){
            return next(err,result);
        });
    },

    self.register = function(profile,next){
        var reg = new Registration();
        reg.applyForMembership(profile,self.findUserByName,function(err,result){
            if(err || (result.success == false)){
                return next(false);
            } else {
                db.user.addUser(result.user.username,result.user.firstname,result.user.lastname,result.user.email,result.user.hashedPassword,result.user.authenticationToken,function(err,resultinserted){
                    if(err || (resultinserted == false)){
                        return next(false);
                    } else {
                        return next(true);
                    }
                });
            }
        });
    };

    self.findUserByToken = function(token, next){
        db.user.findUserByToken(token,function(err,result){
            return next(err,result);
        });       
        
    };

    self.getUserProjects = function(id_user,done){
        db.project.getUserProjects(id_user,function(result){
                return done(result);
        })
        
    }

    self.getUserProjectById = function(id_user,id_project,done){
        db.project.getProjectById(id_user,id_project,function(result){
            db.project.getProjectUsers(id_project,function(usersresult){
                return done(result,usersresult);
            })        
        })
        
    }

    self.getUserSubprojectsByProjectId = function(id_user,id_project,done){
        db.subproject.getUserSubprojectsByProjectId(id_user,id_project,function(result){
                return done(result);
        })
        
    }

    self.getUserSubprojectById = function(id_user,id_subproject,done){
        db.subproject.getSubprojectById(id_user,id_subproject,function(result){
            db.subproject.getSubprojectUsers(id_subproject,function(usersresult){
                return done(result,usersresult);
            })        
        })
        
    }

    self.addProject = function(id_user,project,next){
        var pro = new Project();
        pro.applyForMembership(project,function(err,result){
            if(err || (result.success == false)){
                return next(false);
            } else {
                db.project.addProject(result.project.name,result.project.type,id_user,result.project.id_theme,result.project.about,function(err,resultinserted){
                    if(err || (resultinserted[0] == undefined)){
                        return next(false);
                    } else {
                        db.project.addProjectToUser(id_user,resultinserted[0],1,function(err,resultadded){//1-creator role
                            if(err || (resultadded == false)){
                                return next(false);
                            } else { 
                                return next(true);
                            }
                        });
                    }
                });      
            }
        });
    }

    self.addSubproject = function(id_user,subproject,next){
        var sub = new Subproject();
        sub.applyForMembership(subproject,function(err,result){
            if(err || (result.success == false)){
                return next(false);
            } else {
                db.subproject.addSubproject(result.subproject.name,id_user,result.subproject.id_project,result.subproject.about,function(err,resultinserted){
                    if(err || (resultinserted[0] == undefined)){
                        if(err)console.log(err);
                        return next(false);
                    } else {
                        db.subproject.addSubprojectToUser(id_user,resultinserted[0],1,function(err,resultadded){//1-creator role
                            if(err || (resultadded == false)){
                                return next(false);
                            } else { 
                                return next(true);
                            }
                        });
                    }
                });      
            }
        });
    }

    return self;
};

module.exports = Membership;