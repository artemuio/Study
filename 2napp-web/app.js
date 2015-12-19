var path = require('path');
var config = require('./config');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express  = require('express');
var session = require('express-session');
var passport = require('passport');
var SessionStore = require('express-mysql-session');
var app = express();
var Database = require("../2napp-db");
var db = new Database();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.get("cookies_secret_key")));
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD
app.use(session({
 secret: 'You never cheat me',
 name: '2napp_cokie',
 store: db.sessionStore(session),
 resave: true,
 saveUninitialized: true,
 cookie: { 
    secure: true,
    maxAge: 432000000//5days
  }
}));

=======

var options= {
  host: config.get("db_host"),
  port: config.get("db_port"),
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
app.use(session({
  secret: 'You never cheat me',
  name: '2napp_cokie',
  store: sessionStore,
  resave: true,
  saveUninitialized: true
}));
>>>>>>> origin/PavlezT-second
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport); // pass passport for configuration
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

<<<<<<< HEAD
require('./routes/account.js')(app,passport);//contains login,logout methods

require('./routes/profile')(app);

var routesindex = require('./routes/index');
app.use('/', routesindex);
=======
var routes = require('./routes/index');
app.use('/', routes);
>>>>>>> origin/PavlezT-second
//var users = require('./routes/users');
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
