var Registration = require("../lib/registration");
var knex = require('../config/dbconfig');

describe("Registration", function() {
    var reg = {};
    before(function (done) {
        reg = new Registration(knex);
        done();
    });
    describe("a valid application", function () {
        var regResult = {};
        before(function (done) {
            reg.applyForMembership({
                email: "artem@yandex.ru",
                username: "artem",
                password: "12345",
                confirm: "12345"
            }, function (err, result) {
                regResult = result;
                done();
            });
        });
        it("is successful", function () {
            regResult.success.should.equal(true);
        });
        it("creates a user", function () {
            regResult.user.should.be.defined;
        });
        it("creates a log entry", function () {

        });
        it("sets the user`s status to approved", function () {

        });
        it("offers a welcome message", function () {

        });

    });
    describe("an empty or null email", function () {
        it("is not successful", function () {

        });
        it("tells user that email is required", function () {

        });
    });
    describe("empty or null password", function () {
        it("is not successful", function () {

        });
        it("tells user that password is required", function () {

        });
    });

    describe("password and confirm mismatch", function () {
        it("is not successful", function () {

        });
        it("tells user that password don`t match", function () {

        });
    });

    describe("email already exists", function () {
        it("is not successful", function () {

        });
        it("tells user that email already exists", function () {

        });
    });
});