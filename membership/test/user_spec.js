var should = require("should");
var User = require("../models/user");

describe("User", function(){
    describe("defaults", function(){
       var user = {};
        before (function(){
            user = new User({
                username: "login",
                password: "12345",
                email : "artem@yandex.ru"
            });
        });

        it("Name is login", function(){
            user.username.should.equal("login");
        });
        it("email is artem@yandex.ru", function(){
            user.email.should.equal("artem@yandex.ru");
        });
        it("has a pending status", function(){
            user.status.should.equal("pending");
        });
        it("has a signInCount", function(){
            user.signInCount.should.be.defined;
        });
        it("has a authenticationToken", function(){
            user.authenticationToken.should.be.defined;
        });
    });
});