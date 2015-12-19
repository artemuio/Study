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

 /* var newusername=false;
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
*/
    $('#changeprofileimage').children('input').change(function(){

      var file = $('#changeprofileimage').children('input')[0].files[0];
      if (!file.type.match('image.*')) {
        return false;
      }
      $('#changeprofileimage').children("a").children('p')[0].textContent = file.name ;

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          $('#changeprofileimage').css("background", "url("+ e.target.result+") no-repeat"); 
          $('#changeprofileimage').css("background-size","cover");     
        };
      })(file);

      // Read in the image file as a data URL.
      reader.readAsDataURL(file); 
    });

  $("#settingsusersubmitbutton").click(function(){
    if($('#newfullname')[0].value !="" && $('#newemail')[0].value != ""){
      $("#settingsusersubmitbutton").hide();
      $.ajax({
            url:"/usersettings",
            method:"POST",
            data:{
                name:$('#newfullname')[0].value,
                email:$('#newemail')[0].value
            },
            success:function(){
              $("#closesettingspopup").click();
            },
            error:function(){
              $("#errorinsettingsprofile").show();
                console.log("Change error");
            }
        })
    };
  });

    $("#settingsuserschangeava").click(function(){
    if(true){
  //    $("#settingsusersubmitbutton").hide();
      var formData = new FormData($('#changeprofileimage')[0]);
      formData.append('image',$('#changeprofileimage').children('input')[0].files[0]);
      if (!$('#changeprofileimage').children('input')[0].files[0].type.match('image.*')) {
        return false;
      }
      $.ajax({
            url:"/usersettings",
            method:"POST",
            contentType: false,
            processData: false,
            data:formData,
            success:function(){
              $("#closesettingspopup").click();
            },
            error:function(){
              $("#errorinsettingsprofile").show();
                console.log("Change error");
            }
        })
    };
  });

    $('#projects').children('div ').children('label').click(function(){
      
      window.location.href=("/project"+'?'+"id_project="+$(this)[0].id);
      /*
      $.ajax({
            url:"/project",
            method:"GET",
            data:{
                id_project:$(this)[0].id//$(this)[0].value,
            },
            success:function(data){
              document.open();
              document.write(data);
              document.close();
              //window.location.pathname=("/project?id_project="+$(this)[0].id);
            },
            error:function(){
           //   $("#errorinsettingsprofile").show();
                console.log("Project error");
            }
        });*/
    })
});