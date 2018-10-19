// Declaramos elementos del DOM
var $video = document.querySelector("video"),
	$canvas = document.getElementById("canvas"),

if (navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true })
		.then(function (stream) {

			$video.srcObject = stream;
			$video.play();

			function capturar() {
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
				
				return foto;
			};
		})
		.catch(function (err0r) {
			console.log("error de compatibilidad");
		});
}


