$(document).ready(function(){
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
  $("#closeproject").click(function(){
    $("#hover").fadeOut();
    $("#popupforproject").fadeOut();
  });
  //<input id="settings"type="checkbox" />
										//<label for="settings" class="root-nav2" >SETTING PROFILE</input>
});