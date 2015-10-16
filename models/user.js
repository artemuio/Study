
var config = require("../config");
var crypto = require('crypto');
var async = require('async');

var password = "";

module.exports.password = password;

var user = {
  username:"lolka",
  password:"lolka1"
}
module.exports.findByUsername = function(username,callback){
  console.log("find one bu username;");
  return callback(null,user);
}
module.exports.findById = function (id,callback){
  console.log("Find one by id;");
  return callback(null,user);
};

module.exports.encryptPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
/*
virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() { return this._plainPassword; });
*/

module.exports.checkPassword=function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports.authorize= function(username, password, callback) {
  var User = this;

  async.waterfall([
    function(callback) {
      findByUsername({username: username}, callback);
    },
    function(user, callback) {
      if (user) {
        if (checkPassword(password)) {
          callback(null, user);
        } else {
          callback(new AuthError("Password is incorrect"));
        }
      } else {
        callback(new AuthError("There is no user"));
      }
    }
  ], callback);
};

function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}



exports.AuthError = AuthError;


