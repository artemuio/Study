/**
 * Created by artem on 15.11.2015.
 */
var User = require("../models/user");
var Application = require("../models/application");
var assert = require("assert");
var bcrypt = require("bcrypt-nodejs");

var RegResult = function(){

    var result = {
        success :false,
        message:null,
        user:null

    };

    return result;
};

var Registration = function() {
    var self = this;

    var validateInputs = function (app) {
        if (!app.email || !app.password || !app.username) {
            app.setInvalid("Email and password are required");
        } else if (app.password !== app.confirm) {
            app.setInvalid("Passwords don't match")
        } else {
            app.validate();
        }
    };

    var checkIfUserExists = function (app,findUserByName, next) {
        findUserByName(app.username,function(err,result){
            if(err){
                console.log(err);
                return next(err,null);
            } else {
                var exists = false;
                if (result.length >0) {
                    app.setInvalid("User with same username already exists");
                    exists = true;
                }
                next(null,exists);
            }
        });
    };

    self.applyForMembership = function (args,findUserByName, next) {
        var regResult = new RegResult();
        var app = new Application(args);
        validateInputs(app);
        checkIfUserExists(app,findUserByName, function(err, exists){
            assert.ok(err === null, err);
            if (!exists && !app.isInvalid()){
                var user = new User(args);
                user.hashedPassword = bcrypt.hashSync(app.password);
                regResult.success = true;
                regResult.message = "Successful registration";
                regResult.user = user;
            }
            next(null, regResult);
        });
    };
    return self;
};

module.exports = Registration;