
function Myfunc(){
    $("#fail").hide();
    if(($("#email")[0].value!="") && ($("#password")[0].value!='')) {
	$.ajax({
            url:"/login",
            method:"POST",
            data:{
                email:$("#email")[0].value,
                password:$("#password")[0].value
            },
             success:function(){
             	$("#fail").hide();
                window.location.href='/profile';
            },
            error:function(){
                console.log("Username error");
                $("#fail").show();
            }
        })
	$("#password")[0].value = '';
}
}