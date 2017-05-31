/**
 * Created by rafal09pl on 29.05.17.
 */

const picturesNumber = 26;
const gameWidth = 1500;
const gameHeight = 900;

var firstShowed = "";
var secondShowed = "";
var guessed = [];
var guessedCount = 0;
var clickCount = 0;
var pairsNumber = 0;
var blocked = false;
var chosen = [];
var cacheImages = [];


function choosePictures(count) {
    var chosen = []
    for (var i = 0; i < count; i++) {
        var guess = Math.floor(Math.random() * picturesNumber);
        while ($.inArray(guess, chosen) != -1) {
            guess = Math.floor(Math.random() * picturesNumber);
        }
        chosen.push(guess);
    }
    return chosen;
}

function placePictures(chosen, records, columns) {
    var result = [];
    var usedFields = [];
    for (var r = 0; r < records; r++) {
        result.push(new Array(columns));
    }

    var gR = Math.floor(Math.random() * records);
    var gC = Math.floor(Math.random() * columns);
    for (var i = 0; i< chosen.length; i++) {
        gR = Math.floor(Math.random() * records);
        gC = Math.floor(Math.random() * columns);
        while ($.inArray("#"+gR+"#"+gC, usedFields) != -1) {
            gR = Math.floor(Math.random() * records);
            gC = Math.floor(Math.random() * columns);
        }
        result[gR][gC] = chosen[i];
        usedFields.push("#"+gR+"#"+gC);
        gR = Math.floor(Math.random() * records);
        gC = Math.floor(Math.random() * columns);
        while ($.inArray("#"+gR+"#"+gC, usedFields) != -1) {
            gR = Math.floor(Math.random() * records);
            gC = Math.floor(Math.random() * columns);
        }
        result[gR][gC] = chosen[i];
        usedFields.push("#"+gR+"#"+gC);
    }
    return result;

}

function cardOnClick(trig, picturesPlaces) {
    var id = "#" + $(trig).attr('id');
    var spltId = id.split('-');
    var r = parseInt(spltId[1]);
    var c = parseInt(spltId[2]);

    if (blocked || $.inArray(id, guessed) != -1) {
        return;
    }
    // alert("noco");

    if (firstShowed != id) {
        clickCount++;
        $(id).flip(true);
        if (firstShowed == "") {
            //PIERWSZE KLIKNIECIE
            firstShowed = id;
        } else {
            var spltLId = firstShowed.split('-');
            var lr = parseInt(spltLId[1]);
            var lc = parseInt(spltLId[2]);
            if (picturesPlaces[r][c] == picturesPlaces[lr][lc]) {
                //UDALO SIE
                guessed.push(id);
                guessed.push(firstShowed);
                firstShowed = "";
                guessedCount++;
            } else {
                //PUDLO
                blocked = true;
                setTimeout(function () {
                    $(id).flip(false);
                    $(firstShowed).flip(false);
                    firstShowed = "";
                    blocked = false;
                }, 1000);
            }
        }
    }
}

function generateGame(records, columns, totalWidth, totalHeight, picturesPlaces) {
    imgWidth = totalWidth / columns - 24;
    imgHeight = totalHeight / records - 24;
    for (var r = 0; r < records; r++) {
        for (var c = 0; c < columns; c++) {
            $("#grid").append(`<div class="card" id="c-${r}-${c}"></div>`);

            let elem = $("#c" + "-" + r + "-" + c);
            elem.css("width", "" + Math.floor(imgWidth));
            elem.css("height", "" + Math.floor(imgHeight));
            elem.css("float", "left");
            elem.append(`<div class = "imagePlaceHolder front">?</div>`);
            elem.append(`<div class = "imagePlace back"><img src = "images/img${picturesPlaces[r][c]}.jpg" width="${imgWidth}" height="${imgHeight}"/></div>`);
            // $("#c" + "-" + r + "-" + c).flip();
            $("#c-" + r + "-" + c).flip({trigger: 'manual'});
            $("#c-" + r + "-" + c).click(function () {
                cardOnClick(this, picturesPlaces);
            });
        }
        $("#grid").append(`<div style="clear: left"></div>`);
    }
}

$(document).ready(function () {
    $("#menu-container").css("display", "none");
    $("#grid").css("display", "block");

    let totalWidth = 1500;
    let totalHeight = 900;
    let columns = 4;
    let records = 2;

    chosen = choosePictures(columns*records/2, records, columns);

    var pict = placePictures(chosen, records, columns);

    generateGame(records, columns, totalWidth, totalHeight, pict);

});



