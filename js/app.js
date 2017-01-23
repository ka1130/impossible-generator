  document.addEventListener("DOMContentLoaded", function(event) {

    //Define variables

    var togglePosition = document.getElementById("togglePosition");
    var toggleZoom = togglePosition.nextElementSibling;
    var toggleRotation = toggleZoom.nextElementSibling;

    var toolsNav = document.getElementById("toolsNav");
    var toggleGrayscale = toolsNav.firstElementChild.children[1];
    var toggleBrightness = toggleGrayscale.nextElementSibling;
    var toggleBlur = toggleBrightness.nextElementSibling;
    var toggleNegative = toggleBlur.nextElementSibling;

    var controlsPosition = document.getElementsByClassName("controls-position")[0];
    var controlsZoom = controlsPosition.nextElementSibling;
    var controlsRotation = controlsZoom.nextElementSibling;

    var toolsNav = document.getElementById("toolsNav");
    var openFiltersNav = document.getElementById("openFiltersNav");
    var closeFiltersNav = toolsNav.firstElementChild.firstElementChild;

    var toolsInfo = controlsRotation.parentElement.lastElementChild;

    var sliderFilters = document.getElementsByClassName("slider-filter");
    var grayscaleRange = document.getElementById("grayscale-range");

    var grayscaleRangeSlider = document.getElementById("grayscaleRange");
    var brightenRangeSlider = document.getElementById("brightenRange");
    var blurRangeSlider = document.getElementById("blurRange");
    var negativeRangeSlider = document.getElementById("negativeRange");

    var imgContainer = document.getElementById("imgContainer");
    var userPhoto = document.getElementById("userPhoto");
    var inputFile = document.getElementById("inputFile");
    var uploadPhoto = document.getElementById("uploadPhoto");
    var canvas = document.getElementById("imgCanvas");
    var ctx = canvas.getContext("2d");
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

    if (typeof x === "undefined") {
      x = 0;
    }

    if (typeof y === "undefined") {
      y = 0;
    }


    // Put photo on canvas

    function drawNewImage() {
      ctx.clearRect(x, y, canvas.width, canvas.height);
      //      ctx.drawImage(userPhoto, 0, 0);
      // ctx.drawImage(userPhoto, 0, 0, userPhoto.width * hRatio, userPhoto.height * vRatio,
      //   0, 0, canvas.width, canvas.height);
      var MAX_WIDTH = 600;
      var MAX_HEIGHT = 1000;
      var width = userPhoto.width;
      var height = userPhoto.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(userPhoto, x, y, width, height);
      ctx.clearRect(x, y, canvas.width, canvas.height);
    }

    //Responsive tools navigation

    function openNav() {
      toolsNav.style.height = "100%";
    }

    function closeNav() {
      toolsNav.style.height = "0%";
    }

    function closeControls() {
      controlsPosition.style.visibility = "hidden";
      controlsZoom.style.visibility = "hidden";
      controlsRotation.style.visibility = "hidden";
      toolsInfo.style.visibility = "hidden";
    }

    openFiltersNav.addEventListener("click", openNav, false);
    closeFiltersNav.addEventListener("click", closeNav, false);


    // Toggle bottom panel tools

    togglePosition.addEventListener("click", function(event) {
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
      }
      controlsPosition.style.visibility = "visible";
      controlsZoom.style.visibility = "hidden";
      controlsRotation.style.visibility = "hidden";
      toolsInfo.style.visibility = "hidden";
    }, false);

    toggleZoom.addEventListener("click", function(event) {
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
      }
      controlsPosition.style.visibility = "hidden";
      controlsZoom.style.visibility = "visible";
      controlsRotation.style.visibility = "hidden";
      toolsInfo.style.visibility = "hidden";
    }, false);

    toggleRotation.addEventListener("click", function(event) {
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
      }
      controlsPosition.style.visibility = "hidden";
      controlsZoom.style.visibility = "hidden";
      controlsRotation.style.visibility = "visible";
      toolsInfo.style.visibility = "hidden";
    }, false);

    toggleGrayscale.addEventListener("click", function(event) {
      closeNav();
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
        sliderFilters[0].style.visibility = "visible";
      }
      closeControls();
    }, false);

    toggleBrightness.addEventListener("click", function(event) {
      closeNav();
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
        sliderFilters[1].style.visibility = "visible";
      }
      closeControls();
    }, false);

    toggleBlur.addEventListener("click", function(event) {
      closeNav();
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
        sliderFilters[2].style.visibility = "visible";
      }
      closeControls();
    }, false);

    toggleNegative.addEventListener("click", function(event) {
      closeNav();
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
        sliderFilters[3].style.visibility = "visible";
      }
      closeControls();
    }, false);


    // Upload a photo

    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(event) {
          userPhoto.setAttribute("src", event.target.result);

          var MAX_WIDTH = 1200;
          var MAX_HEIGHT = 2000;
          var width = userPhoto.width;
          var height = userPhoto.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(userPhoto, x, y, width, height);

          var dataurl = canvas.toDataURL("image/png");
          userPhoto.setAttribute("src", dataurl);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#inputFile").change(function() {
      readURL(this);
      drawNewImage();
      ctx.save();
    });


    uploadPhoto.addEventListener("click", function(event) {
      $("#inputFile").trigger("click");
    }, false);


    // Move

    function movePhoto() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      userPhoto.style.display = "none";      
    }

    moveTop.addEventListener("click", function(event) {
      movePhoto();
      y -= 2;
      ctx.drawImage(userPhoto, x, y);
    }, false);

    moveRight.addEventListener("click", function(event) {
      movePhoto();
      x += 2;
      ctx.drawImage(userPhoto, x, y);
    }, false);

    moveLeft.addEventListener("click", function(event) {
      movePhoto();
      x -= 2;
      ctx.drawImage(userPhoto, x, y);
    }, false);

    moveBottom.addEventListener("click", function(event) {
      movePhoto();
      y += 2;
      ctx.drawImage(userPhoto, x, y);
    }, false);


    // Zoom-in, Zoom-out

    zoomIn.addEventListener("click", function(event) {
      ctx.scale(0.99, 0.99);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
    }, false);

    zoomOut.addEventListener("click", function(event) {
      ctx.scale(1.01, 1.01);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
    }, false);


    // Rotation

    rotateControl.addEventListener("click", function(event) {
      ctx.restore();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(93.5, 125.5); //rotating around the middle point of the photo
      ctx.rotate(15 * Math.PI / 180); //by 15deg
      ctx.translate(-93.5, -125.5); //rotating around the middle point of the photo
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
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

      for (var i = 0; i < data.length; i += 4) {
        var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];

        data[i] = brightness;// red       
        data[i + 1] = brightness; // green        
        data[i + 2] = brightness; // blue
      }

      ctx.putImageData(imageData, x, y);

    }, false);


    // Filters: Brighten

    brightenRangeSlider.addEventListener("input", function(event) {

      var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
      var data = imageData.data;
      var brightenVal;

      //pierwsze wejście w metodę - oldValue jest jeszcze undefined, więc przypisujemy mu wartość domyślną slidera
      if (brightenRangeSlider.oldValue === undefined) brightenRangeSlider.oldValue = brightenRangeSlider.defaultValue;

      //obliczanie wielkości (gdby krok slidera był większy niż 1) i kierunku zmiany (jasniej/ciemniej)

      brightenVal = brightenRangeSlider.value - brightenRangeSlider.oldValue;
      brightenRangeSlider.oldValue = brightenRangeSlider.value;

      ctx.restore();

      for (var i = 0; i < data.length; i += 4) {
        data[i] += brightenVal; // red
        data[i + 1] += brightenVal; // green
        data[i + 2] += brightenVal; // blue   
      }
      ctx.putImageData(imageData, x, y);

      ctx.save();
    }, false);



    // Filters: Blur

    blurRangeSlider.addEventListener("input", function(event) {
      var blurVal = blurRangeSlider.value / 3;

      var passes = 1 * blurVal;
      //ctx.restore();

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
      //ctx.save();
    }, false);


    // Filters: Negative

    negativeRangeSlider.addEventListener("input", function(event) {

      ctx.restore();

      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      var negativeVal = negativeRangeSlider.value * 0.01;

      for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i] / (negativeVal / 0.01); // red
        data[i + 1] = 255 - data[i + 1] / (negativeVal / 0.02); // green
        data[i + 2] = 255 - data[i + 2] / (negativeVal / 0.05); // blue
        //          data[i + 3] = 255 - data[i + 3] * negativeVal * 0.9; // alpha
      }

      ctx.putImageData(imageData, 0, 0);

    }, false);



    // Reset

    resetBtn.addEventListener("click", function(event) {
      ctx.restore();
      ctx.drawImage(userPhoto, 0, 0, canvas.width, canvas.height);
    }, false);


    // Download Polaroid

    function downloadCanvas(link, canvasId, filename) {
      link.href = canvas.toDataURL();
      link.download = filename;
    }

    //add Polaroid border

    function borderImage(x) {
      ctx.beginPath();
      ctx.lineWidth = x; // This is your border thickness
      canvas.width += x * 2;
      canvas.height += x * 2;
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#fff";
      //      ctx.globalCompositeOperation = "source-over";
      ctx.rect(0, 0, canvas.width, 30);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fill();
      // ctx.shadowColor = '#999';
      // ctx.shadowBlur = 20;
      // ctx.shadowOffsetX = 15;
      // ctx.shadowOffsetY = 15;
      ctx.drawImage(userPhoto, x, x, canvas.width - 2 * x, canvas.height - 2 * x - 50);
    }

    download.addEventListener("click", function(event) {
      borderImage(20);
      downloadCanvas(this, "imgCanvas", "impossible-photo.png");
      canvas.style.display = "none";
      location.reload();
    }, false);


    // Play Camera Sound

    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "sounds/camera.mp3");
    audioElement.setAttribute("autoplay:false", "autoplay");
    audioElement.load();
    $.get();

    download.addEventListener("click", function(event) {
      audioElement.play();
    }, false);



  });