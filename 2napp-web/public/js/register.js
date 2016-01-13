$(document).ready(function() {
    var usname=false;
    $("#username").focusout(function(){
        if($("#username")[0].value == '')return false;
        $.ajax({
            url:"/singin",
            method:"GET",
            data:{
                username:$("#username")[0].value
            },
            error:function(){
                console.log("Username error");
                $("#usernamebusy").show();
                usname=false;
            },
            success:function(){
                console.log("Username is empty");
                $("#usernamebusy").hide();
                usname=true;
            }
        })
    });
    $("#registerbutton").click(function() {
        if ((checkfunc())&&($("#checkbox1").prop("checked"))) {
            $("#statusbar").show();
            $("#registerbutton").hide();
            rotation();
            var firstname = $("#firstname");
            var lastname = $("#lastname");
            var email = $("#email");
            var username = $("#username");
            var password = $("#password");
            $.ajax({
                url: "/singin",
                method: "POST",
                data: {
                    firstname: firstname[0].value,
                    lastname: lastname[0].value,
                    username: username[0].value,
                    password: password[0].value,
                    confirm: $("#retypepassword")[0].value,
                    email: email[0].value
                },
                error: function() {
                    console.log("Error");
                    $("#status").text("Registration Falue!");
                    $("#status").show();
                    $("#statusbar").hide();
                },
                success: function() {
                    console.log("New user added");
                    $("#status").show();
                    $("#statusbar").hide();
                }
            });
        }
    });
    var rotation = function() {
        jQuery("#statusbar").rotate({
            angle: 0,
            animateTo: 360,
            duration: 2000,
            callback: rotation
        });
    }
    var checkfunc = function(){
        var r=true;
        if($("#firstname")[0].value==""){
            $("#firstname").css({"border":"2px solid red"});
            r=false;
        } else {
            $("#firstname").css({"border":"none"});
        }
        if($("#lastname")[0].value==""){
            $("#lastname").css({"border":"2px solid red"});
            r=false;
        } else {
            $("#lastname").css({"border":"none"});
        }
        if(($("#username")[0].value=="")||(!usname)){
            $("#username").css({"border":"2px solid red"});
            r=false;
        } else {
            $("#username").css({"border":"none"});
        }
        if(($("#email")[0].value=="")||(!(/.@./.test($("#email")[0].value)))){
            $("#email").css({"border":"2px solid red"});
            r=false;
        } else {
            $("#email").css({"border":"none"});
        }
        if($("#password")[0].value==""){
            $("#password").css({"border":"2px solid red"});
            r=false;
        } else {
            $("#password").css({"border":"none"});
        }
        if(($("#retypepassword")[0].value=="")||($("#password")[0].value != $("#retypepassword")[0].value)){
            $("#retypepassword").css({"border":"2px solid red"});
            r=false;
        } else {
            $("#retypepassword").css({"border":"none"});
        }
        return r;
    }
});