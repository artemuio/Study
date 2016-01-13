/**
 * Created by artem on 17.11.2015.
 */
var SessionStore = require('express-mysql-session');
var config = require('./config');
var User_repo = require('./repositories/user-repo');
var Project_repo = require('./repositories/project-repo');
var Subproj_repo = require('./repositories/subproject-repo');
var knex = require("./config/dbconfig");

var db = function() {
    var self = this;

    self.sessionStore = function(session){
        var KnexSessionStore = require('connect-session-knex')(session);
        var store = new KnexSessionStore({
                knex: knex,
                tablename: 'sessions' // optional. Defaults to 'sessions'
            });
        return store;
    };

    self.user = User_repo;
    self.project = Project_repo;
    self.subproject = Subproj_repo;

    return self;
}

module.exports = db;