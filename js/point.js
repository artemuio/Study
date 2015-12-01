

$(document).ready(function(){

	$('#fileupload').change(function(){
		var file = $(this)[0].files[0];
		$('#file-box').append(""+'<label class="document"><i class="fotodoc"></i>' + file.name +'<i id="datecreator">10/10/15</i><i id="namecreator">artem</i><i class="delete"></i></label>');
	});

})