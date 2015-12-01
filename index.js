var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var config = require('./config');
var mysql = require('mysql');
var pool = mysql.createPool({
    host: config.get("db_host"),
    port:config.get("db_port"),
    user: config.get("db_user"),
    password: config.get("db_3"),
    database: config.get("db_name"),
});
var SessionStore = require('express-mysql-session');
var options={
	host: config.get("db_host"),
    port:config.get("db_port"),
    user: config.get("db_user"),
    password: config.get("db_3"),
    database: config.get("db_name"),
	createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    schema: {
        tableName: 'sessions_for',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
var sessionStore = new SessionStore(options);

var handle = {}
handle["/"] = requestHandlers.start;
handle["/index.html"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/siteuploaddata"] = requestHandlers.siteuploaddata;
handle["/singin"] = requestHandlers.singin;
handle["/createnewproject"] = requestHandlers.createnewproject;
handle["/usersettings"]=requestHandlers.usersettings;
handle['/projectsettings']=requestHandlers.projectsettings;

server.start(router.route, handle, pool,sessionStore);