$(document).ready(function() {


	//Filters - Grayscale

	Filters = {};
	Filters.getPixels = function(img) {
		var c = this.getCanvas(img.width, img.height);
		var ctx = c.getContext("2d");
		ctx.drawImage(img, 187, 251);
		return ctx.getImageData(0, 0, c.width, c.height);
	};

	Filters.getCanvas = function(w, h) {
		var c = document.createElement("canvas");
		c.width = w;
		c.height = h;
		return c;
	};

	Filters.filterImage = function(filter, image, var_args) {
		var args = [this.getPixels(image)];
		for (var i = 2; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		return filter.apply(null, args);
	};

	Filters.grayscale = function(pixels, args) {
		var d = pixels.data;
		for (var i = 0; i < d.length; i += 4) {
			var r = d[i];
			var g = d[i + 1];
			var b = d[i + 2];
			// CIE luminance for the RGB
			// The human eye is bad at seeing red and blue, so we de-emphasize them.
			var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
			d[i] = d[i + 1] = d[i + 2] = v
		}
		return pixels;
	};

	var photo = document.getElementById("userPhoto");
	var canvas = document.getElementsByTagName("canvas")[0];
	console.log(canvas);
	canvas.parentNode.insertBefore(photo.cloneNode(true), canvas);
	canvas.style.display = "none";



	function runFilter(id, filter, arg1, arg2, arg3) {
		var c = document.getElementById(id); //pobieram id canvasu (podam je potem jako argument)
		var s = c.previousSibling.style; //styl obrazka

		if (s.display == "none") { //jeśli obrazek jest niewidoczny, to go pokaż
			s.display = "inline";
			c.style.display = "none"; //...i ukryj canvas
		} else {
			var idata = Filters.filterImage(filter, photo, arg1, arg2, arg3);
			c.width = idata.width;
			c.height = idata.height;
			var ctx = c.getContext("2d");
			ctx.putImageData(idata, 0, 0);
			s.display = "none"; //ukryj obrazek
			c.style.display = "inline"; //pokaż canvas
		}
	}

	grayscale = function() {
		runFilter("grayscale", Filters.grayscale);
	}

	var btn = document.getElementsByTagName("button")[0];
	console.log(btn);

	btn.addEventListener("click", function(event) {
		event.preventDefault();
		grayscale();
	}, false);


	// uploadPhoto.on("change", function(event) {
	// 	var photo = document.getElementById("userPhoto");
	// 	var canvas = document.getElementsByTagName("canvas")[0];
	// 	console.log(canvas);
	// 	canvas.insertBefore(photo.cloneNode(true), canvas);
	// 	//		canvas.parentNode.insertBefore(photo.cloneNode(true), canvas);
	// 	canvas.style.display = "none";
	// 	console.log(this.value);
	// 	console.log(this.files[0]);

	// 	grayscale = function() {
	// 		runFilter("grayscale", Filters.grayscale);
	// 	}

	// });



});