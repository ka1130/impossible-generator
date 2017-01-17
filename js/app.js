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
	var canvas = document.getElementById('grayscale');
	var originalPhoto = document.getElementById("userPhoto");
	var grayscaleRangeSlider = $("#grayscaleRange");
	var grayscaleVal = grayscaleRangeSlider.val();

	function drawImage(imageObj) {
		var canvas = document.getElementById('grayscale');
		var context = canvas.getContext('2d');
		var x = 0;
		var y = 0;

		context.drawImage(imageObj, x, y);

		var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
		var data = imageData.data;

		for (var i = 0; i < data.length; i += (4/grayscaleVal)) {
			var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
			// red
			data[i] = brightness;
			// green
			data[i + 1] = brightness;
			// blue
			data[i + 2] = brightness;
		}

		// overwrite original image
		context.putImageData(imageData, x, y);

	}

	grayscaleRangeSlider.on("change", function(event) {
		console.log(grayscaleRangeSlider.val());
		var imgList = $("#imgContainer").find("img");

		if (imgList.length == 1) {
			canvas.parentNode.insertBefore(originalPhoto.cloneNode(true), canvas);
		}

		event.preventDefault();

		$("#form1").find("img").css("display", "none");

		drawImage(document.getElementById("userPhoto"));
	});


	grayscaleBtn.addEventListener("click", function(event) {

		var imgList = $("#imgContainer").find("img");

		if (imgList.length == 1) {
			canvas.parentNode.insertBefore(originalPhoto.cloneNode(true), canvas);
		}

		event.preventDefault();

		$("#form1").find("img").css("display", "none");

		drawImage(document.getElementById("userPhoto"));



	}, false);


});