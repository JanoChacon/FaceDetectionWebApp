var API_KEY = "_vFHc0ga_XbxiA12BaZq8O8_0GQqAV5F";
var API_SECRET = "g8d6IiLW7GfQyfWKh5oTOSjsMvL5SjZr";
var API_URL = "https://api-us.faceplusplus.com/facepp/v3";

// Declaramos elementos del DOM
var $video = document.querySelector("video"),
    $canvas = document.getElementById("canvas");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            $video.srcObject = stream;
            $video.play();
        })
        .catch(function (err0r) {
            console.log("error de compatibilidad");
        });
}

function detectar() {
    //Pausar reproducción
    $video.pause();

    //Obtener contexto del canvas y dibujar sobre él
    var contexto = $canvas.getContext("2d");
    $canvas.width = $video.videoWidth;
    $canvas.height = $video.videoHeight;
    contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);

    var foto = $canvas.toDataURL(); //Esta es la foto, en base 64	
    //Reanudar reproducción
    $video.play();

    detectarRostro(foto, 'image_base64');
   
};

function detectarRostro(source, sourceType) {
    var ATRIBUTOS = "facequality,gender";
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10 * 1000;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                json = JSON.parse(xhr.responseText);
                try {
                    document.getElementById("responseTextArea").innerHTML = json.faces[0].attributes.facequality.value;
                } catch (error) {
                    $("#responseTextArea").text("no detectado");
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
                json = JSON.parse(xhr.responseText);
                $("#responseTextArea").text(json);
                return json;
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


