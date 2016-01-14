$(document).ready(function(){

  $("#hover").height($(document).height());

  var id_project_for_subject = null;

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
    $("#popupforsubproject").fadeOut();
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

  $(".createnewsubproject").click(function(){
    $("#hover").fadeIn();
    $("#popupforsubproject").fadeIn();
    id_project_for_subject = $(this).parent('ul').parent(' article')[0].id;
    return false;
  })  
  //chiusura al click sul pulsante
  $("#closenewproject").click(function(){
    $("#hover").fadeOut();
    $("#popupforproject").fadeOut();
  });

  $("#closenewsubproject").click(function(){
    $("#hover").fadeOut();
    $("#popupforsubproject").fadeOut();
  });

  $("#submitbuttonnewproject").click(function(){
    if($('#newprojectname')[0].value !=""){
      $.ajax({
            url:"/createnewproject",
            method:"POST",/////////////////////////method get for name 
            data:{
                name:$('#newprojectname')[0].value,
                id_theme:$('#selectthemenewproject')[0].options.selectedIndex,
                type:$('#selectformatnewproject')[0].options.selectedIndex,
                about:$('#newprojecttextabout')[0].value
            },
             success:function(){
              $("#closenewsubproject").click();
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

$("#submitbuttonnewsubproject").click(function(){
    if(($('#newsubprojectname')[0].value !="") && (id_project_for_subject != null)){
      $.ajax({
            url:"/createnewsubproject",
            method:"POST",/////////////////////////method get for name 
            data:{
                name:$('#newsubprojectname')[0].value,
                id_project:id_project_for_subject,
                about:$('#newsubprojecttextabout')[0].value
            },
             success:function(){
              $("#closenewsubproject").click();
              id_project_for_subject = null;
            },
            error:function(){
              id_project_for_subject = null;
              console.log("Newsubproject error");
            }
        })
    };
  });

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

    $('#projects').children('div ').children('label').children('img').click(function(){
      var id = $(this).parent('label')[0].id;
      if((!$('.ac-container input#'+id).is(":checked") )&& ( $('#projects').children('div ').children('article#'+id).children('ul').children().size() < 2 )){
       $.ajax({
            url:"/profile",
            method:"POST",
            data:{
                id_project:id
            },
            success:function(maindata){
              if(maindata.length != 0){
                maindata.forEach(function(element, index){
                  var data = maindata[index];
                  var ulcontainer = $('#projects').children('div ').children('article#'+data.id_project).children('ul');
                  $(ulcontainer).append("<li><a id='subproject"+data.id_subproject+"' href='subproject?id_subproject="+data.id_subproject +"' >"+data.subproject_name+"</a></li>");
                });
              }
              $('.ac-container input#'+id).click();
            },
            error:function(){
                console.log("Project error");
            }
        });
     } else {
        $('.ac-container input#'+id).click();
     }
      return false;
    });

    $('#projects').children('div ').children('label').click(function(){
      
      window.location.href=("/project"+'?'+"id_project="+$(this)[0].id);

      return false;
    })
});