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
  //<input id="settings"type="checkbox" />
										//<label for="settings" class="root-nav2" >SETTING PROFILE</input>
});