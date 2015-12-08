/**
 * Created by artem on 18.11.2015.
 */

var Promise = require("bluebird");
var knex = require("../config/dbconfig");

var UserRepo = {
    getUsers: function () {
        return knex("users")
            .select("*")
            .then();
    },
    findUserByName:function(name){
        return knex("users")
            .select("*")
            .where("username", "=", name)
            .then();
    },
    getUser: function(userId){
        return knex("users")
            .select("*")
            .where("id", userId)
            .first().then();
    }
};

module.exports = UserRepo;