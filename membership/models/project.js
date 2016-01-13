var assert = require("assert");

var Project = function(args){
  assert.ok(args.name, "Name is required");

  var project = {};
  project.name = args.name;
  project.type = args.type;
  project.id_theme = args.id_theme;
  project.about= args.about;
  return project;
};

module.exports = Project;