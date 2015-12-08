var assert = require("assert");
var utility = require("../lib/utility");

var User = function(args){
  assert.ok(args.username, "Username is required");

  var user = {};
  user.username = args.username;
  user.email = args.email;
  user.status = args.status || "pending";
  user.createdAt = args.createdAt || new Date();
  user.signInCount = args.signInCount || 0;
  user.authenticationToken = args.authenticationToken || utility.randomString(18);
  return user;
};

module.exports = User;