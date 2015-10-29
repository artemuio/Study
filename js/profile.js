$(document).ready(function(){

  $("#hover").height($(document).height());

  $("#settings").click(function(){
  	$("#hover").fadeIn();
    $("#settingspopup").fadeIn();
    $("#settingsusersubmitbutton").show();
    $("#errorinsettingsprofile").hide();
  })
  //chiusura al click sulla parte scura
  $("#hover").click(function(){
		$(this).fadeOut();
    $("#settingspopup").fadeOut();
    $("#popupforproject").fadeOut();
	});
  
  //chiusura al click sul pulsante
  $("#closesettingspopup").click(function(){
		$("#hover").fadeOut();
    $("#settingspopup").fadeOut();
	});
  $("#new-project").click(function(){
    $("#hover").fadeIn();
    $("#popupforproject").fadeIn();
  })  
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

  var newusername=false;
    $("#newusername").focusout(function(){
        $.ajax({
            url:"/usersettings",
            method:"GET",
            data:{
                username:$("#newusername")[0].value
            },
            error:function(){
                console.log("Username error");
                $("#busylogin").show();
                newusername=false;
            },
            success:function(){
                console.log("Username is empty");
                $("#busylogin").hide();
                newusername=true;
            }
        })
    });

    $('#changeprofileimage').children('input').change(function(){
      $('#changeprofileimage').children("a").children('p')[0].textContent = $('#changeprofileimage').children('input')[0].value ;
    });

  $("#settingsusersubmitbutton").click(function(){
    if($('#newfullname')[0].value !="" && newusername != false && $('#newusername')[0].value !="" && $('#newemail')[0].value != ""){
      $("#settingsusersubmitbutton").hide();
      $.ajax({
            url:"/usersettings",
            method:"POST",
            data:{
                name:$('#newfullname')[0].value,
                username:$('#newusername')[0].value,
                email:$('#newemail')[0].value
            },
            success:function(){
              $("#closesettingspopup").click();
              newusername = false;
            },
            error:function(){
              $("#errorinsettingsprofile").show();
                console.log("Change error");
            }
        })
    };
  });

});