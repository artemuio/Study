/**
 * Created by artem on 18.11.2015.
 */

var Promise = require("bluebird");
var knex = require("../config/dbconfig");

var UserRepo = {
    getUsers: function (next) {
         knex("user")
            .select("*")
            .then(function(result){
                return next(result);
            });
    },
    findUserByName: function (name,next) {
        knex("user")
            .select("*")
            .where("username", "=", name)
            .then(function(result){
                return next(null,result);
            })
            .error(function(err){
                return next(err,null);
            })
    },
    findUserByToken: function (token,next) {
        knex("user")
            .select("*")
            .where("authenticationToken", "=", token)
            .first()
            .then(function(result){
                if(result != undefined){
                    knex('user').where('id','=',result.id)
                    .update('lastEnterDate',knex.fn.now())
                    .then();
                }
                return result;
            })
            .then(function(result){
                return next(null,result);
            })
            .error(function(err){
                return next(err,null);
            })
    },
    getUser: function (userId,next) {
        knex("user")
            .select("*")
            .where("id", userId)
            .first().then(function(result){
                return next(result);
            });
    },

    getUserProjects: function (id_user,next) {
        knex('project')
        .select('*')
        .where('id_user','=',id_user)
        .innerJoin('UserProjectBridge', 'project.id', 'UserProjectBridge.id_project')
        .then(function(result){
            console.log(result)
            return next(result);
        })
        .error(function(err){
            return next(err);
        })
    },
};

module.exports = UserRepo;