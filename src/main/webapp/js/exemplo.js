
function showLetra (data,art,mus,arrayid) {
	if (! arrayid) arrayid = 0;
	if (data.type == 'exact' || data.type == 'aprox') {
		// Se for exato ou aproximado carregamos a letra para o usuário
		$('#letra .text').text(data.mus[arrayid].text);
		// Mostra botão com letra original ou tradução
		if (data.mus[arrayid].translate) {
			$('#letra .text').prepend('<input type=button value="Portuguese &raquo;" onClick="$(document).trigger(\'translate\')"><br/>');
			$(document).one('translate',function() {
				$('#letra .text').text(data.mus[arrayid].translate[0].text);
				$('#letra .text').prepend('<input type=button value="&laquo; Original" onClick="$(document).trigger(\'original\')"><br/>');
				$(document).one('original',function() {
					showLetra(data,art,mus,arrayid);
				});
			});
		}
		// Se não for exato
		if (data.type == 'aprox' && !$('#aprox').is('div')) {
			$('#letra').prepend('<div id=aprox>We found something similar<br/><span class=songname>"' + data.mus[arrayid].name + '"</span></div>');
			// If Vagalume found more than one possible matches
			if (data.mus.length > 0) {
				var html = '<select class=songselect>';
				for (var i = 0; i < data.mus.length; i++) {
					html += '<option value="'+i+'"'+(i==arrayid?' selected':'')+'>'+data.mus[i].name+'</option>';
				}
				html += '</select>';
				$('#aprox span.songname').html(html);
				$('#aprox select.songselect').change(function() {
					var aID = $('option:selected',this).val();
					showLetra (data,art,mus,aID);
				});
			}
		}
	} else if (data.type == 'song_notfound') {
		// Song not found, but artist was found
		// You can list all songs from Vagalume here
		$('#letra .text').html(
			'Song "'+mus+'" from "'+art+'" was not found.<br/>'
			+'<a target=_blank href="http://www.vagalume.com.br/add/lyrics.php">'
			+'Add this song to Vagalume &raquo;</a>'
		);
	} else {
		// Artist not found
		$('#letra .text').html(
			'Song "'+mus+'" from "'+art+'" was not found<br/>'
			+'(artist not found)<br/>'
			+'<a target=_blank href="http://www.vagalume.com.br/add/lyrics.php">'
			+'Add this song to Vagalume &raquo;</a>'
		);
	}
}
function fetchLetra (art,mus) {
	var data = jQuery.data(document,art + mus); // cache read
	if (data) {
		showLetra(data, art, mus);
		return true;
	}
	var url = "http://api.vagalume.com.br/search.php"
		+"?art="+encodeURIComponent(art)
		+"&mus="+encodeURIComponent(mus);
	// Check if browser supports CORS - http://www.w3.org/TR/cors/
	if (!jQuery.support.cors) {
		url += "&callback=?";
	}
	jQuery.getJSON(url,function(data) {
		// What we do with the data
		jQuery.data(document,art + mus,data); // cache write
		showLetra(data, art, mus);
	});
}
// Just an example of how you can call this using elements on the page
fetchLetra($("#artista").text(),$("#music").text());