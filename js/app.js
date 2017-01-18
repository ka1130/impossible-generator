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
	var ctx = canvas.getContext("2d");

	function drawImage(imageObj) {

		var x = 0;
		var y = 0;
		var grayscaleVal = grayscaleRangeSlider.val() * 0.01;

		ctx.drawImage(imageObj, x, y); //namaluj mi nowy obraz na jakimś x i jakimś y

		var imageData = ctx.getImageData(x, y, imageObj.width, imageObj.height);
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
		ctx.putImageData(imageData, x, y); //przetworzone dane umieść z powrotem na danej pozycji x i y

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
		ctx.drawImage(originalPhoto, 0, 0);
	});

	//przycinanie obrazu

	// window.onload(function() {

	// 	ctx.beginPath();
	// 	ctx.rect(canvas.width / 2, canvas.height / 2, 187, 251);
	// 	ctx.clip();
	// 	ctx.scale(2, 2);
	// 	ctx.drawImage(userPhoto);


	// });

	//Zoom-in, Zoom-out
	var zoomIn = document.getElementById("zoom-in");
	var zoomOut = document.getElementById("zoom-out");

	zoomIn.addEventListener("click", function(event) {
		ctx.scale(0.99, 0.99);
		ctx.drawImage(originalPhoto, 0, 0);

	}, false);

	zoomOut.addEventListener("click", function(event) {
		ctx.scale(1.01, 1.01);
		ctx.drawImage(originalPhoto, 0, 0);
	}, false);



	//Move
	var moveTop = document.getElementById("moveTop");
	var moveRight = document.getElementById("moveRight");
	var moveLeft = document.getElementById("moveLeft");
	var moveBottom = document.getElementById("moveBottom");
	var x = 0;
	var y = 0;

	moveTop.addEventListener("click", function(event) {
		ctx.drawImage(originalPhoto, x, y);
		y -= 2;
	}, false);

	moveRight.addEventListener("click", function(event) {
		ctx.drawImage(originalPhoto, x, y);
		x -= 2;
	}, false);


	moveLeft.addEventListener("click", function(event) {
		ctx.drawImage(originalPhoto, x, y);
		x += 2;
	}, false);

	moveBottom.addEventListener("click", function(event) {
		ctx.drawImage(originalPhoto, x, y);
		y += 2;
	}, false);

	//Rotation
	var rotateControl = document.querySelector(".rotation-circle");
	console.log(rotateControl);
	rotateControl.addEventListener("click", function(event) {
		ctx.rotate(20*Math.PI/180);
	}, false);



});