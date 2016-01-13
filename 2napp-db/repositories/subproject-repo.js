var Promise = require("bluebird");
var knex = require("../config/dbconfig");

var SubprojRepo = {   

    getUserSubprojectsByProjectId: function (id_user,id_project,next) {
        knex('subproject')
        .select('*')
        .where({
            'UserSubprojectBridge.id_user': id_user,
            'subproject.id_project':  id_project
        })
        .innerJoin('UserSubprojectBridge', 'subproject.id','UserSubprojectBridge.id_subproject')
        .then(function(result){
            return next(result);
        })
        .error(function(err){
            return next(err);
        })
    },

    getSubprojectById: function (id_user,id_subproject,next) {
        knex('subproject')
        .select('*')
        .where({
            'UserSubprojectBridge.id_user': id_user,
            'id_subproject':  id_subproject
        })
        .innerJoin('UserSubprojectBridge', 'subproject.id','UserSubprojectBridge.id_subproject')
        .then(function(result){
            return next(result);
        })
        .error(function(err){
            return next(err);
        })
    },

    getSubprojectUsers: function (id_subproject,next) {
        knex('user')
        .select('firstname','lastname','user.id')
        .where('id_subproject','=',id_subproject)
        .innerJoin('UserSubprojectBridge', 'user.id', 'UserSubprojectBridge.id_user')
        .then(function(result){
            return next(result);
        })
        .error(function(err){
            return next(err);
        })
    },
    
};

module.exports = SubprojRepo;