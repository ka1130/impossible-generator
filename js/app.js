  document.addEventListener("DOMContentLoaded", function(event) {

    console.log("DOM fully loaded and parsed");

    // Upload a photo

    var uploadPhoto = document.getElementById("uploadPhotoBtn");
    var userPhoto = document.getElementById("userPhoto");

    var grayscaleBtn = document.getElementsByTagName("button")[0];
    var canvas = document.getElementById("imgCanvas");
    var ctx = canvas.getContext("2d");
    var grayscaleRangeSlider = document.getElementById("grayscaleRange");
    var brightenRangeSlider = document.getElementById("brightenRange");
    var blurRangeSlider = document.getElementById("blurRange");
    var negativeRangeSlider = document.getElementById("negativeRange");
    var resetBtn = document.getElementById("resetBtn");
    var download = document.getElementById("download");

    var moveTop = document.getElementById("moveTop");
    var moveRight = document.getElementById("moveRight");
    var moveLeft = document.getElementById("moveLeft");
    var moveBottom = document.getElementById("moveBottom");

    var zoomIn = document.getElementById("zoom-in");
    var zoomOut = document.getElementById("zoom-out");

    var rotateControl = document.querySelector(".rotation-circle");
    var x;
    var y;

    var hRatio = canvas.width / userPhoto.width;
    var vRatio = canvas.height / userPhoto.height;

    if (typeof x === "undefined") {
      x = 0;
    }

    if (typeof y === "undefined") {
      y = 0;
    }

    function drawNewImage() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, 0, 0);
      // ctx.drawImage(userPhoto, 0, 0, userPhoto.width * hRatio, userPhoto.height * vRatio,
      //   0, 0, canvas.width, canvas.height);
    }

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(event) {
          userPhoto.setAttribute("src", event.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    uploadPhoto.addEventListener("change", function(event) {
      readURL(this);
      drawNewImage();
      ctx.save();
    }, false);


    // Filters: Grayscale

    grayscaleRangeSlider.addEventListener("input", function(event) {
      drawNewImage();
      var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
      //pobierz pozycję i wymiary z kontekstu
      var data = imageData.data;
      //zapisz te dane do zmiennej data, 
      //imageData.data przechowuje wartości poszczególnych pikseli (0-255)
      var grayscaleVal = grayscaleRangeSlider.value * 0.01;

      drawNewImage();

      for (var i = 0; i < data.length; i += 4) {
        var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];

        data[i] = brightness / grayscaleVal; // red       
        data[i + 1] = brightness / grayscaleVal // green        
        data[i + 2] = brightness / grayscaleVal; // blue
      }
      // overwrite original image

      ctx.putImageData(imageData, x, y);
      //przetworzone dane umieść z powrotem na danej pozycji x i y
    }, false);


    // Filters: Brighten

    brightenRangeSlider.addEventListener("input", function(event) {
      drawNewImage();
      var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
      var data = imageData.data;
      var brightenVal = brightenRangeSlider.value * 0.75;

      for (var i = 0; i < data.length; i += 4) {
        data[i] += brightenVal; // red
        data[i + 1] += brightenVal; // green
        data[i + 2] += brightenVal; // blue   
      }
      ctx.putImageData(imageData, x, y);
    }, false);


    // Filters: Blur

    blurRangeSlider.addEventListener("input", function(event) {

      var blurVal = blurRangeSlider.value / 3;

      ctx.drawImage(userPhoto, x, y);
      var passes = 1 * blurVal;
      ctx.globalAlpha = 1 / (blurVal * 2);
      //overlay eight instances of the image over the original, each with 1/8th of full opacity
      for (var i = 1; i <= passes; i++) {
        for (var y = -1; y < 2; y++) {
          for (var x = -1; x < 2; x++) {
            ctx.drawImage(userPhoto, x, y);
          }
        }
      }
      ctx.globalAlpha = 1.0 * blurVal;

    }, false);


    // Filters: Megative

    negativeRangeSlider.addEventListener("input", function(event) {

      ctx.drawImage(userPhoto, x, y);

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var negativeVal = negativeRangeSlider.value * 0.0005;


      for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i] / (negativeVal / 0.01); // red
        data[i + 1] = 255 - data[i + 1] / (negativeVal / 0.02); // green
        data[i + 2] = 255 - data[i + 2] / (negativeVal / 0.05); // blue
        //          data[i + 3] = 255 - data[i + 3] * negativeVal * 0.9; // alpha
      }

      // overwrite original image
      ctx.putImageData(imageData, 0, 0);


    }, false);


    // przycinanie obrazu

    // window.onload(function() {

    // 	ctx.beginPath();
    // 	ctx.rect(canvas.width / 2, canvas.height / 2, 187, 251);
    // 	ctx.clip();
    // 	ctx.scale(2, 2);
    // 	ctx.drawImage(userPhoto);


    // });

    // Zoom-in, Zoom-out

    zoomIn.addEventListener("click", function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      ctx.scale(0.99, 0.99);
    }, false);

    zoomOut.addEventListener("click", function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      ctx.scale(1.01, 1.01);
    }, false);


    // Move

    moveTop.addEventListener("click", function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      y -= 2;
    }, false);

    moveRight.addEventListener("click", function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      x += 2;
    }, false);

    moveLeft.addEventListener("click", function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      x -= 2;
    }, false);

    moveBottom.addEventListener("click", function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      y += 2;
    }, false);


    // Rotation

    rotateControl.addEventListener("click", function(event) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(93.5, 125.5);
      ctx.rotate(15 * Math.PI / 180);
      ctx.translate(-93.5, -125.5);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
    }, false);


    // Reset

    resetBtn.addEventListener("click", function(event) {
      userPhoto.style.webkitFilter = "blur(0px)";
      ctx.restore();
      ctx.drawImage(userPhoto, 0, 0, canvas.width, canvas.height);
    }, false);

    // Download pic
    function downloadCanvas(link, canvasId, filename) {

      link.href = document.getElementById(canvasId).toDataURL();
      link.download = filename;
    }

    function drawPolaroid() {
      //      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 30;
      ctx.strokeStyle = "#fff";
      ctx.shadowColor = '#999';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 15;
      ctx.shadowOffsetY = 15;

      // ctx.fill();
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    download.addEventListener("click", function(event) {
      drawPolaroid();
      downloadCanvas(this, "imgCanvas", "impossible-photo.png");
    }, false);



  });