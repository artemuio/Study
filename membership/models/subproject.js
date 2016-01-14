var assert = require("assert");

var Subproject = function(args){
  assert.ok(args.name, "Name is required");

  var subproject = {};
  subproject.name = args.name;
  subproject.id_project = args.id_project;
  subproject.about= args.about;
  return subproject;
};

module.exports = Subproject;