$(document).ready(function(){
	
	var gridMusic 		= $("#music");
	var gridMusicTitle 	= $("#gridMusicTitle");
	var search 			= $("#search");
	
	search.focus();
	
	search.autocomplete({
		source: function(request,response){
		    $.ajax({
		        url: "http://localhost/Unimusic/geonames.json",
		        dataType: "json",
		        success: function(data){

		            response($.map(data.estados.filter(completeFilter), function(item){
		                  return {
		                      label: item.nome,
		                      value: item.nome
		                  };
		            }));
		        }
		        /*
		        data: {
		            parametros da requisição em json
		        }*/
		    });
		},
		autoFocus: true	
	});
	
	gridMusicTitle.html("Musicas mais acessadas");
	

});

var musicAutoComplete = function(request,response){
    $.ajax({
        url: "http://localhost/Unimusic/geonames.json",
        dataType: "json",
        success: function(data){

            response($.map(data.estados.filter(completeFilter), function(item){
                  return {
                      label: item.nome,
                      value: item.nome
                  };
            }));
        }
        /*
        data: {
            parametros da requisição em json
        }*/
    });
};

var musicSearch = function () {

    var fragment = $("#search").val();
    
	iconLoading();
    $('.jumbotron').fadeOut();

    $.ajax({
            method: "GET",
            url:  "https://api.vagalume.com.br/search.artmus"
            + "?q=" + fragment
            + "&limit=5"
            + "&extra=relmus"
            + "&apikey={Unimusic}"//,

        })
        .done(function( data ) {
            console.log(data);
        });

    return false;
}

var iconLoading = function(){

    $('#loading')
        .toggleClass('glyphicon-refresh-animate')
        .toggleClass('glyphicon-refresh')
        .toggleClass('glyphicon');
    return false;
};

   /* iconLoading();
    $('.jumbotron').fadeOut();

    $.getJSON('/EncontreSuaMusica/src/main/webapp/musica.html',function(data){
        console.log("foi");
    }).done(function(data){
        $('.resultList').innerHTML = data;
    });

    return iconLoading();
}
*/

    
