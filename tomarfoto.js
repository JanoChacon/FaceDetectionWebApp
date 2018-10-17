// Declaramos elementos del DOM
var $video = document.querySelector("video"),
	$canvas = document.getElementById("canvas"),
	$boton = document.getElementById("capturar"),
	$boton2 = document.getElementById("comparar");

if (navigator.mediaDevices.getUserMedia) {
	navigator.mediaDevices.getUserMedia({ video: true })
		.then(function (stream) {

			$video.srcObject = stream;
			$video.play();

			$boton.addEventListener("click", function () {
				//Pausar reproducción
				$video.pause();
	
				//Obtener contexto del canvas y dibujar sobre él
				var contexto = $canvas.getContext("2d");
				$canvas.width = $video.videoWidth;
				$canvas.height = $video.videoHeight;
				contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);
	
				var foto = $canvas.toDataURL(); //Esta es la foto, en base 64
				detectarRostro(foto, "image_base64");
	
				//Reanudar reproducción
				$video.play();
			});
	
			$boton2.addEventListener("click", function () {
	
				//Pausar reproducción
				$video.pause();
	
				//Obtener contexto del canvas y dibujar sobre él
				var contexto = $canvas.getContext("2d");
				$canvas.width = $video.videoWidth;
				$canvas.height = $video.videoHeight;
				contexto.drawImage($video, 0, 0, $canvas.width, $canvas.height);
	
				var foto = $canvas.toDataURL(); //Esta es la foto, en base 64
	
				compararRostros(document.getElementById("inputImage").value, "image_url1", foto, "image_base64_2");
	
				//Reanudar reproducción
				$video.play();
			});
		})
		.catch(function (err0r) {
			console.log("error de compatibilidad");
		});
}


