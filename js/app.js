$(document).ready(function() {


	// Upload a photo
	var uploadPhoto = $("#uploadPhotoBtn");

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(event) {
				$("#userPhoto").attr("src", event.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	uploadPhoto.on("change", function(event) {
		readURL(this);
	});

	//Filters - Grayscale

	var imageObj = new Image();

	var grayscaleBtn = document.getElementsByTagName("button")[0];
	var canvas = document.getElementById("imgCanvas");
	var originalPhoto = document.getElementById("userPhoto");
	var grayscaleRangeSlider = $("#grayscaleRange");
	var brightenRangeSlider = $("#brightenRange");
	var blurRangeSlider = $("#blurRange");
	var resetBtn = $("#resetBtn");
	var context = canvas.getContext("2d");

	function drawImage(imageObj) {

		var x = 0;
		var y = 0;
		var grayscaleVal = grayscaleRangeSlider.val() * 0.01;

		context.drawImage(imageObj, x, y); //namaluj mi nowy obraz na jakimś x i jakimś y

		var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
		//pobierz pozycję i wymiary z kontekstu
		var data = imageData.data;
		//zapisz te dane do zmiennej data, imageData.data przechowuje wartości poszczególnych pikseli (0-255)

		for (var i = 0; i < data.length; i += 4) {
			var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
			// red
			data[i] = brightness / grayscaleVal;
			// green
			data[i + 1] = brightness / grayscaleVal;
			// blue
			data[i + 2] = brightness / grayscaleVal;
		}

		// overwrite original image
		context.putImageData(imageData, x, y); //przetworzone dane umieść z powrotem na danej pozycji x i y

	}

	grayscaleRangeSlider.on("input", function(event) {

		var imgList = $("#imgContainer").find("img");

		if (imgList.length == 1) {
			canvas.parentNode.insertBefore(originalPhoto.cloneNode(true), canvas);
		}

		$("#form1").find("img").css("display", "none");

		drawImage(document.getElementById("userPhoto"));
	});

	resetBtn.on("click", function(event) {
		context.drawImage(originalPhoto, 0, 0);
	});

	//przycinanie obrazu

	// window.onload(function() {

	// 	context.beginPath();
	// 	context.rect(canvas.width / 2, canvas.height / 2, 187, 251);
	// 	context.clip();
	// 	context.scale(2, 2);
	// 	context.drawImage(userPhoto);


	// });

	//Zoom-in, Zoom-out
	var zoomIn = document.getElementById("zoom-in");
	var zoomOut = document.getElementById("zoom-out");

	zoomIn.addEventListener("click", function(event) {
		context.scale(0.99, 0.99);
		context.drawImage(originalPhoto, 0, 0);

	}, false);

	zoomOut.addEventListener("click", function(event) {
		context.scale(1.01, 1.01);
		context.drawImage(originalPhoto, 0, 0);
	});

	var x = 0;
	var y = 0;

	var drawFunc = function() {

		context.clearRect(0, 0, canvas.width, canvas.height);
		y -= 14;
		context.drawImage(imageObj, x, y);
		
		requestAnimationFrame(drawFunc);
	};

	//Move
	document.getElementById("moveTop").addEventListener("click", function(event) {

		drawFunc();

		console.log("moved");
	});



});