$(document).ready(function(){

    $('#btn-search').click(musicSearch);

});

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

    
