/**
 * Created by artem on 17.11.2015.
 */

var User = require("../models/user");
var Application = require("../models/application");
var assert = require("assert");
var bcrypt = require("bcrypt-nodejs");

var authResult = function() {

	var result = {
        success :false,
        message:null,
        user:null
    }
    return result;
};

var Authentication = function(){
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

  var checkIfUserExists = function (args,callback) {

  		var exists = false;
  		if(args[0] != undefined ){
  			exists = true;
  		}

      return callback(args,exists);    
    };

  self.applyForMembership = function (args, password,next) {
        var AuthResult =  new authResult();
        //var app = new Application(args);
        //validateInputs(app);
        checkIfUserExists(args, function(args,exists){
            if (exists && (password !=  0)) {
            	bcrypt.compare(password,args[0].hashedPassword ,function(err,result){
                	//assert.ok(err === null, err);
                	AuthResult.success = result;
                	AuthResult.message = "authentication";
                	AuthResult.user = args[0];
                	next(null, AuthResult);
                })
            } else {
            	next(null, AuthResult);
            }
        });
    };
  return self;
};

module.exports = Authentication;