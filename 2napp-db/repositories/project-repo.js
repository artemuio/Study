/**
 * Created by artem on 18.11.2015.
 */

var Promise = require("bluebird");
var knex = require("../config/dbconfig");

var ProjectRepo = {
    getProjects: function () {
        return knex.select("id", "name")
            .from("projects")
            .then();
    }
};

module.exports = ProjectRepo;