/**
 * Created by artem on 18.11.2015.
 */

var Promise = require("bluebird");
var knex = require("../config/dbconfig");

var ProjectRepo = {
    getProjectById: function (id,next) {
        return knex("project")
        .select('*')
        .where("id",'=',id)
        .then(function(result){
        	return next(result);
        });
    }
};

module.exports = ProjectRepo;