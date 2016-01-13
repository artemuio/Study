var assert = require("assert");
var utility = require("../lib/utility");

var User = function(args){
  assert.ok(args.username, "Username is required");

  var user = {};
  user.username = args.username;
  user.firstname = args.firstname;
  user.lastname = args.lastname;
  user.email = args.email;
  user.authenticationToken = args.authenticationToken || utility.randomString(18);
  return user;
};

module.exports = User;