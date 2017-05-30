/**
 * Created by rafal09pl on 29.05.17.
 */

const picturesNumber = 26;

function choosePictures(count) {
    var chosen = []
    for (var i = 0; i < count; i++) {
        var guess = Math.floor(Math.random() * picturesNumber);
        while ($.inArray(chosen, guess)) {
            guess = Math.floor(Math.random() * picturesNumber);
        }
        chosen.push(guess);
    }
    return chosen;
}



$(document).ready(function () {
    $("#menu-container").css("display", "none");
    $("#grid").css("display", "block");

    let totalWidth = 1500;
    let totalHeight = 900;
    let columns = 8;
    let records = 4;
    let imgWidth = totalWidth / columns - 24;
    let imgHeight = totalHeight / records - 24;

    generateTemplate(records, columns, totalWidth, totalHeight);
    $("#p00").addClass("imagePlace").removeClass("imgPlaceHolder");
    $("#p00").html('');
    $("#p00").append(`<img src="images/img0.jpg" width = "${imgWidth}" height="${imgHeight}"/>`)

})

function generateTemplate(records, columns, totalWidth, totalHeight) {
    imgWidth = totalWidth / columns - 24;
    imgHeight = totalHeight / records - 24;
    for (var r = 0; r < records; r++) {
        for (var c = 0; c < columns; c++) {
            $("#grid").append(`<div class="imgPlaceHolder" id="p${r}${c}">?</div>`);
            let elem = $("#p" + r + c);
            elem.css("width", "" + Math.floor(imgWidth));
            elem.css("height", "" + Math.floor(imgHeight));
            elem.css("float", "left");
        }
        $("#grid").append(`<div style="clear: left"></div>`);
    }
}