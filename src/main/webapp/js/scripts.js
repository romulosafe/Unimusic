$(document).ready(function() {
    var search = $("#search");
    var searchButton = $("#searchButton");
    
    searchButton.mouseup(onClickupSearchElement);    
    search.keyup(onKeyupSearchElement);
    search.focus();
    
    createMusicItem({isFirst: true});

});

/*
* Configuração de music-item
* musicTitle - Titulo da Musica
* artistName - Nome do artista
* musicImage - url para imagem
* isFirst    - Indica se é o primeiro "insert" na coleção
*
*/

/* Exemplo de chamada
    createMusicItem({
     musicTitle: 'Primeira Musica',
     musicId: 'abcde'
     artistName: 'Euzinho',
     isFirst: true
     });
 */

var createMusicItem = function(config){
    var musicItems = $(".music-item");
    var newMusicItems = musicItems.clone();
    var musicItem = newMusicItems[0];

    config.isFirst ? musicItems[0].remove() : undefined;

    musicItem.getElementsByClassName("music-title")[0].innerHTML =  config.musicTitle ? config.musicTitle : "Nenhum resultado";
    musicItem.getElementsByClassName("artist-name")[0].innerHTML =  config.artistName ? config.artistName : "...";
    musicItem.getElementsByClassName("music-img"  )[0].setAttribute("src",config.musicImage ? config.musicImage : "");
    musicItem.getElementsByClassName("music-id"   )[0].value = config.musicId ? config.musicId : "";
    musicItem.getElementsByClassName("music-link" )[0].onclick = onClickMusicItem;

    $(".music-list").append(musicItem);
}

/*
 * Evento de teclado para #search
 * */

var onKeyupSearchElement = function(e){

    $("#search").autocomplete({
        source: getMusic,
        minlength: 2,
        delay: 700
    });

}

var onClickupSearchElement = function(e){
	
	$("searchButton")({
		source: getMusic,
		delay: 700
	});
}

/*Consulta musicas na API do vagalume*/

var getMusic = function(request,response){

    var fragment = $("#search").val();

    $.ajax({
            method: "GET",
            type: "jsonp",
            url:  "https://api.vagalume.com.br/search.artmus"
            + "?q=" + fragment
            + "&limit=9"
            + "&extra=relmus"
            + "&apikey={Unimusic}"

        })
        .done(updateMusicList);

    iconLoading()
    return false;
}

var updateMusicList = function(data){
    var musicItems = $(".music-item");

    if(!data.response) return;

    $.each(musicItems,function(index,value){
        index == 0 ? undefined:musicItems[index].remove();
    })

    $.each(data.response.docs,function(index,value){

        with(data.response.docs[index]){

            createMusicItem({
                musicTitle: title,
                artistName: band,
                musicId: id,
                isFirst: index == 0
            });
        }
    })
}

var onClickMusicItem = function(e){
    var musicId = this.getElementsByClassName("music-id")[0].value;

    getLyrics(musicId);

    return false

}

var getLyrics = function(id){
    $.ajax({
            method: "GET",
            type: "jsonp",
            url:  "https://api.vagalume.com.br/search.php"
            + "?musid=" + id
            + "&apikey={Unimusic}"

        })
        .done(updateLyrics);
}

var updateLyrics = function(data){

    var modal = $("#musicModalModel");

    if(data.type != 'exact') return;

    console.log(data);

    modal[0].getElementsByClassName("music-title"  )[0].innerHTML = data.art.name;
    modal[0].getElementsByClassName("music-artist" )[0].innerHTML = data.mus[0].name;
    $(".music-content").html(data.mus[0].text.replace(/\n/g,"<br/>"));

}

/*
* Icone de loading
* */

var iconLoading = function(){

    $('#ico-search')
        .toggleClass('glyphicon-refresh-animate')
        .toggleClass('glyphicon-refresh')
        .toggleClass('glyphicon');
    return false;
};