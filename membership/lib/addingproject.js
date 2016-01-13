/**
 * Created by artem on 15.11.2015.
 */
var Projectmodel = require('../models/project')
var Application = require("../models/application");
var assert = require("assert");

var ProResult = function(){

    var result = {
        success :false,
        message:null,
        project:null

    };

    return result;
};

var Project = function() {
    var self = this;

    var validateInputs = function (app) {
        if (!app.name || !app.about || !app.id_theme || (app.about.length > 400)) {
            app.setInvalid("Email and password are required");
        } else {
            app.validate();
        }
    };

    self.applyForMembership = function (args, next) {
        var proResult = new ProResult();
        var app = new Application(args);
        validateInputs(app);
            if (app.isValid()) {

                if(args.type){
                    if(args.type == 1){
                        args.type = "closed";
                    } else {
                        args.type = "opened";
                    }
                }

                var project = new Projectmodel(args);
                proResult.success = true;
                proResult.message = "Successful new project adding";
                proResult.project = project;
            }
            next(null, proResult);
    };
    return self;
};

module.exports = Project;