// Empty JS for your own code to be here
$(document).ready(function(){

    $('#btn-search').click(musicSearch);

});

var musicSearch = function () {

    var artist = "U2";
    var song = "One";

   /* jQuery.getJSON(
        "https://api.vagalume.com.br/search.php"
        + "?art=" + artist
        + "&mus=" + song,
        +"&apikey={Unimusic}"
        ,
        function (data) {
            // Letra da música
            alert(data.mus[0].text);
        });*/

    // Using YQL and JSONP
    $.ajax({
            method: "POST",
            url:  "https://api.vagalume.com.br/search.php"
            + "?art=" + artist
            + "&mus=" + song
            +"&apikey={Unimusic}",

            data: { art: artist, mus: song, apikey: '{Unimusic}' }
        })
        .done(function( data ) {
            console.log(data);
        });

    return false;
}



   /* iconLoading();
    $('.jumbotron').fadeOut();

    $.getJSON('/EncontreSuaMusica/src/main/webapp/musica.html',function(data){
        console.log("foi");
    }).done(function(data){
        $('.resultList').innerHTML = data;
    });

    return iconLoading();
}

var iconLoading = function(){

    $('#loading')
        .toggleClass('glyphicon-refresh-animate')
        .toggleClass('glyphicon-refresh')
        .toggleClass('glyphicon');
    return false;
};
    */

