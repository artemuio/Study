/**
 * Created by artem on 15.11.2015.
 */
var Subprojectmodel = require('../models/subproject')
var Application = require("../models/application");
var assert = require("assert");

var SubResult = function(){

    var result = {
        success :false,
        message:null,
        subproject:null

    };

    return result;
};

var Subproject = function() {
    var self = this;

    var validateInputs = function (app) {
        if (!app.name || !app.about || !app.id_project || (app.about.length > 400)) {
            app.setInvalid("Email and password are required");
        } else {
            app.validate();
        }
    };

    self.applyForMembership = function (args, next) {
        var subResult = new SubResult();
        var app = new Application(args);
        validateInputs(app);
            if (app.isValid()) {
                var subproject = new Subprojectmodel(args);
                subResult.success = true;
                subResult.message = "Successful new project adding";
                subResult.subproject = subproject;
            }
            next(null, subResult);
    };
    return self;
};

module.exports = Subproject;