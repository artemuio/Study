$(document).ready(function(){

$( "form" ).on( "submit", function(event){
    event.preventDefault();
    Myfunc()
});

function Myfunc(){
    $("#fail").hide();
    if(($("#username")[0].value != 0) && ($("#password")[0].value != 0)) {
    $.ajax({
            url:"/login",
            method:"POST",
            data:{
                username:$("#username")[0].value,
                password:$("#password")[0].value
            },
             success:function(){
                $("#fail").hide();
                window.location.href='/profile';
            },
            error:function(data){
                console.log("Error:"+data.responseText);
                $("#fail").show();
            }
        })
    $("#password")[0].value = '';
}
}


});