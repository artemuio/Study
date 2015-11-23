/**
 * Created by artem on 17.11.2015.
 */

var Registration = require("../lib/registration");
var knex = require('../config/dbconfig');
var assert = require("assert");
var Auth = require("../lib/authentication");

describe("Authentication", function(){
    var reg = {};
    var auth = {};
    before(function (done) {
        reg = new Registration(knex);
        auth = new Auth(knex);
        done();
    });
    describe("a valid login", function(){
        before(function (done) {
            reg.applyForMembership({
                email: "artem@yandex.ru",
                username: "artem",
                password: "12345",
                confirm: "12345"
            }, function (err, result) {
                assert.ok(result.success);
                done();
            });
        });
        it("is successful",function(){

        });
        it("returns a user",function(){

        });
        it("creates a log entry",function(){

        });
        it("is successful",function(){

        });
    });
    describe("empty email", function(){
        it("is not successful",function(){

        });
    });
    describe("empty password", function(){
        it("is not successful",function(){

        });
    });
    describe("password does not match", function(){
        it("is not successful",function(){

        });
    });
    describe("email not found", function(){
        it("is not successful",function(){

        });
    });
});