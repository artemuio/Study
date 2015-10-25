$(document).ready(function(){

  $("#hover").height($(document).height());

  $("#settings").click(function(){
  	$("#hover").fadeIn();
    $("#popup").fadeIn();
  })
  //chiusura al click sulla parte scura
  $("#hover").click(function(){
		$(this).fadeOut();
    $("#popup").fadeOut();
	});
  
  //chiusura al click sul pulsante
  $("#close").click(function(){
		$("#hover").fadeOut();
    $("#popup").fadeOut();
	});
  $("#new-project").click(function(){
    $("#hover").fadeIn();
    $("#popupforproject").fadeIn();
  })
  //chiusura al click sulla parte scura
  $("#hover").click(function(){
    $(this).fadeOut();
    $("#popupforproject").fadeOut();
  });
  
  //chiusura al click sul pulsante
  $("#closenewproject").click(function(){
    $("#hover").fadeOut();
    $("#popupforproject").fadeOut();
  });

  $("#submitbuttonnewproject").click(function(){
    if($('#newprojectname')[0].value !=""){
      $.ajax({
            url:"/createnewproject",
            method:"POST",/////////////////////////method get for name 
            data:{
                name:$('#newprojectname')[0].value,
                theme:$('#selectthemenewproject')[0].options.selectedIndex,
             //   friends:
                format:$('#selectformatnewproject')[0].options.selectedIndex,
                about:$('#newprojecttextabout')[0].value
            },
             success:function(){
              $("#closenewproject").click();
            },
            error:function(){
                console.log("Username error");
            }
        })
    };
  });
});