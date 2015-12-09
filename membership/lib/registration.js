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

var Registration = function(knex) {
    var self = this;

    var validateInputs = function (app) {
        if (!app.email || !app.password) {
            app.setInvalid("Email and password are required");
        } else if (app.password !== app.confirm) {
            app.setInvalid("Passwords don`t match")
        } else {
            app.validate();
        }
    };

    var checkIfUserExists = function (app, next) {
        knex.select('username').from('users').where({username: app.username}).limit(2)
            .then(function (rows) {
                var exists = false;
                if (rows.length >0) {
                    app.setInvalid("User with same username already exists");
                    exists = true;
                }
              next(null, exists);
            })
            .catch(function (error) {
                console.log(error);
                next(error);
            })
            .finally(function(){
                knex.destroy();
        });
    };

    self.applyForMembership = function (args, next) {
        var regResult = new RegResult();
        var app = new Application(args);
        validateInputs(app);
        checkIfUserExists(app, function(err, exists){
            assert.ok(err === null, err);
            console.log(exists);
            if (!exists) {
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