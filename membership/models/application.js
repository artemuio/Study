/**
 * Created by artem on 15.11.2015.
 */

var Application = function(args){
  var app = {};
    app.username = args.username;
    app.email = args.email;
    app.password = args.password;
    app.confirm = args.confirm;
    app.status  = "pending";
    app.message = null;

    app.isValid = function(){
      return app.status == "validated";
    };
    app.isInvalid = function(){
        return !isValid();
    };
    app.setInvalid = function(message){
        app.status = "invalid";
        app.message = message;
    };

    app.validate = function(){
      app.status = "validated";
    };

    return app;
};

module.exports = Application;