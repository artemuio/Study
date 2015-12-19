"use strict";

var config = require("../knexfile");
var knex = require("knex")(config.production);//to set debug invisible

module.exports = knex;