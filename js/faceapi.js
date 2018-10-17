var API_KEY = "_vFHc0ga_XbxiA12BaZq8O8_0GQqAV5F";
var API_SECRET = "g8d6IiLW7GfQyfWKh5oTOSjsMvL5SjZr";
var API_URL = "https://api-us.faceplusplus.com/facepp/v3";

function detectarRostro(source, sourceType) {
    var ATRIBUTOS = "facequality,gender";
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10 * 1000;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var json = JSON.stringify(JSON.parse(xhr.responseText), null, '  ');
                try {
                    $("#responseTextArea").html(html);
                    //return json;
                } catch (err) {
                    $("#responseTextArea").text(json);
                    document.querySelector("#sourceImage").src = source;
                    //return json;
                }
            } else {
                $("#responseTextArea").text("no detectado");
            }
        }
    };

    var fd = new FormData();
    fd.append('api_key', API_KEY);
    fd.append('api_secret', API_SECRET);
    fd.append('return_attributes', ATRIBUTOS);
    xhr.open('POST', API_URL + '/detect');
    fd.append('' + sourceType, source);
    xhr.send(fd);

};

function compararRostros(source1, source1type, source2, source2type) {
    var ATRIBUTOS = "";
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10 * 1000;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var json = JSON.stringify(JSON.parse(xhr.responseText), null, '  ');
                try {
                    $("#responseTextArea").html(html);
                    //return json;
                } catch (err) {
                    $("#responseTextArea").text(json);
                    //return json;
                }
            } else {
                $("#responseTextArea").text("error");
            }
        }
    };

    var fd = new FormData();
    fd.append('api_key', API_KEY);
    fd.append('api_secret', API_SECRET);
    fd.append('return_attributes', ATRIBUTOS);
    xhr.open('POST', API_URL + '/compare');
    fd.append('' + source1type, source1);
    fd.append('' + source2type, source2);

    xhr.send(fd);

};

