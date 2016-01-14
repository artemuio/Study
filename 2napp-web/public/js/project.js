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
    $("#popupforsubproject").fadeOut();
    $('#popupsettingsproject').fadeOut();
	});
  
  //chiusura al click sul pulsante
  $("#closesettingspopup").click(function(){
		$("#hover").fadeOut();
    $("#settingspopup").fadeOut();
	});
  $("#new-project").click(function(){
    $("#hover").fadeIn();
    $("#popupforsubproject").fadeIn();
  })  
  //chiusura al click sul pulsante
  $("#closenewproject").click(function(){
    $("#hover").fadeOut();
    $("#popupforsubproject").fadeOut();
  });

  $('#settingsproject').click(function(){
    $("#hover").fadeIn();
    $('#popupsettingsproject').fadeIn();
  });
  $(".close").click(function(){
    $("#hover").fadeOut();
    $('#popupsettingsproject').fadeOut();
  });

  $("#submitbuttonnewsubproject").click(function(){
    if($('#newsubprojectname')[0].value !=""){
      $.ajax({
            url:"/createnewsubproject",
            method:"POST",/////////////////////////method get for name 
            data:{
                name:$('#newsubprojectname')[0].value,
                id_project:document.location.search.substring(document.location.search.indexOf('=')+1,document.location.search.length),
                about:$('#newsubprojecttextabout')[0].value
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
      $("#settingsuserschangeava").hide();
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


  $('#projectnewavaform').children('input').change(function(){
      var file = $('#projectnewavaform').children('input')[0].files[0];
      if (!file.type.match('image.*')) {
        return false;
      }
      $('#projectnewavaform').children("a").children('p')[0].textContent = file.name ;

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          $('#projectnewavaform').css("background", "url("+ e.target.result+") no-repeat"); 
          $('#projectnewavaform').css("background-size","cover");     
        };
      })(file);

      // Read in the image file as a data URL.
      reader.readAsDataURL(file); 
  });

  $('#projectnewava').click(function(){
    changeprojectava();
  });

   function changeprojectava(){
  //    $("#settingsusersubmitbutton").hide();
      var id=document.location.search.substring(document.location.search.indexOf('=')+1,document.location.search.length);
      var formData = new FormData($('#projectnewavaform')[0]);
      formData.append('image',$('#projectnewavaform').children('input')[0].files[0]);
      if (!$('#projectnewavaform').children('input')[0].files[0].type.match('image.*')) {
        return false;
      }
      $.ajax({
            url:"/projectsettings?id_project="+id+"&name="+ $("#labelforproject"+id)[0].textContent,
            method:"POST",
            contentType: false,
            processData: false,
            data:formData,
            success:function(){
              $(".close").click();
            },
            error:function(){
              $("#errorinprojectsettings").show();///////////////////////////
                console.log("Change error");
            }
        });
  };

  $('#submitsettingsproject').click(function(){
    $(this).hide();
    var nameproj = $('#changeprojectname')[0].value;
    var aboutproj = $('#changeprojecttextabout')[0].value;
    if($('#changeprojectname')[0].value == ' ' || $('#changeprojectname')[0].value =='' ) {
      nameproj = "none";
    }
    if($('#changeprojecttextabout')[0].value == ' ' || $('#changeprojecttextabout')[0].value == ''){
      aboutproj = "none";
    }
    $.ajax({
      url:'/projectsettings',
      method:"POST",
      data:{
        id_project:document.location.search.substring(document.location.search.indexOf('=')+1,document.location.search.length),
        name:nameproj,
        about:aboutproj
      },
      success:function(){
        $(".close").click();
      },
      error:function(){
        $("#errorinprojectsettings").show();///////////////////////////
        console.log("Change error");
      }
    });
  });

  $('#subprojects').children('div ').children('label').click(function(){
      
      window.location.href=("subproject?id_subproject="+$(this)[0].id);

      return false;
  });

});