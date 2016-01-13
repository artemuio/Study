/**
 * Created by artem on 18.11.2015.
 */

var Promise = require("bluebird");
var knex = require("../config/dbconfig");

var ProjectRepo = {
    getProjectById: function (id_user,id_project,next) {
        return knex("project")
        .select('*')
        .where({
  			id_project: id_project,
  			id_user:  id_user
		})
        .innerJoin('UserProjectBridge', 'project.id', 'UserProjectBridge.id_project')
        .then(function(result){
        	return next(result);
        });
    },

    getUserProjects: function (id_user,next) {
        knex('project')
        .select('*')
        .where('id_user','=',id_user)
        .innerJoin('UserProjectBridge', 'project.id', 'UserProjectBridge.id_project')
        .then(function(result){
            return next(result);
        })
        .error(function(err){
            return next(err);
        })
    },

    getProjectUsers: function (id_project,next) {
        knex('user')
        .select('firstname','lastname','user.id')
        .where('id_project','=',id_project)
        .innerJoin('UserProjectBridge', 'user.id', 'UserProjectBridge.id_user')
        .then(function(result){
            return next(result);
        })
        .error(function(err){
            return next(err);
        })
    },

    addProject:function(name,type,id_creator,id_theme,about,next){
       knex('project')
        .insert({
            name:name,
            type:type,
            id_creator:id_creator,
            id_theme:id_theme,
            about:about
        })
        .then(function(result){
            return next(null,result);
        })
        .error(function(err){
            return next(err,null);
        }) 
    },

    addProjectToUser:function(id_user,id_project,id_role,next){
        knex('UserProjectBridge')
        .insert({
            id_user:id_user,
            id_project:id_project,
            id_role:id_role
        })
        .then(function(result){
            return next(null,result);
        })
        .error(function(err){
            return next(err,null);
        }) 
    }

};

module.exports = ProjectRepo;