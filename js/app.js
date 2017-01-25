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

    var openFiltersNav = document.getElementById("openFiltersNav");
    var closeFiltersNav = toolsNav.firstElementChild.firstElementChild;

    var toolsInfo = controlsRotation.parentElement.lastElementChild;

    var sliderFilters = document.getElementsByClassName("slider-filter");
    var grayScaleBtns = document.getElementsByClassName("grayscale-btns")[0];
    var grayScaleBtnsWrapper = grayScaleBtns.children[1];
    var grayScaleOn = grayScaleBtnsWrapper.children[0];
    var grayScaleOff = grayScaleOn.nextElementSibling;

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
    var toolsLeftMoveTop = document.getElementById("toolsLeftMoveTop");
    var toolsLeftMoveLeft = document.getElementById("toolsLeftMoveLeft");
    var toolsLeftMoveRight = document.getElementById("toolsLeftMoveRight");
    var toolsLeftMoveBottom = document.getElementById("toolsLeftMoveBottom");


    var zoomIn = document.getElementById("zoom-in");
    var zoomOut = document.getElementById("zoom-out");
    var toolsLeftZoomIn = document.getElementById("toolsLeftZoomIn");
    var toolsLeftZoomOut = document.getElementById("toolsLeftZoomOut");

    var rotateControl = document.querySelector(".rotation-circle");
    var rotateCCwise = document.getElementById("toolsLeftRotate").children[0];
    var rotateCwise = rotateCCwise.nextElementSibling;

    var x;
    var y;

    if (typeof x === "undefined") {
      x = 0;
    }

    if (typeof y === "undefined") {
      y = 0;
    }


    // Move tools-left container dynamically

    function setMarginLeft() {
      if (window.matchMedia("(min-width: 480px)").matches) {
        var spanLeft = $("#leftBorder");
        var offsetLeft = spanLeft.position().left;
        $("#tools-left").css({
          marginLeft: offsetLeft
        });
      }
    }

    window.addEventListener("resize", setMarginLeft, false);
    window.addEventListener("load", setMarginLeft, true);

    // Move right-hand dropdown menu dynamically

    function setMarginRight() {

      if (window.matchMedia("(min-width: 480px)").matches) {
        var filtersLeft = $("#openFiltersNav");
        var offsetLeft = filtersLeft.position().left;
        $("#toolsNav").css({
          "left": offsetLeft,
          "top": "50px",
          "position": "absolute",
          "display": "block",
          "overflow-y": "auto"
        });
      }
    }

    window.addEventListener("resize", setMarginRight, false);
    window.addEventListener("load", setMarginRight, true);


    //Responsive tools navigation

    function openNav() {
      if (window.matchMedia("(max-width: 479px)").matches) {
        toolsNav.style.visibility = "visible";
        toolsNav.style.height = "100%";
      } else {
        toolsNav.style.height = "100%";
        $("#toolsNav").slideToggle();
      }
    }

    function closeNav() {
      if (window.matchMedia("(max-width: 479px)").matches) {
        toolsNav.style.height = "0%";
      }
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
    // Disable unnecessary buttons on bigger screens

    var mq = window.matchMedia("(min-width: 571px)");

    if (mq.matches) {
      $("#togglePosition").attr("disabled", true);
      $("#toggleZoom").attr("disabled", true);
      $("#toggleRotation").attr("disabled", true);
      $("#togglePosition").css({
        "cursor": "auto"
      });
      $("#toggleZoom").css({
        "cursor": "auto"
      });
      $("#toggleRotation").css({
        "cursor": "auto"
      });
      toolsInfo.innerHTML = "choose your tool in the left-hand panel";
    }

    function showPositionControls(event) {
      if (mq.matches) {
        event.target.removeEventListener("click", showPositionControls);
      } else {
        for (var i = 0; i < sliderFilters.length; i++) {
          sliderFilters[i].style.visibility = "hidden";
        }
        controlsPosition.style.visibility = "visible";
        controlsZoom.style.visibility = "hidden";
        controlsRotation.style.visibility = "hidden";
        toolsInfo.style.visibility = "hidden";
      }
    }

    function showZoomControls(event) {
      if (mq.matches) {
        event.target.removeEventListener("click", showZoomControls);
      } else {
        for (var i = 0; i < sliderFilters.length; i++) {
          sliderFilters[i].style.visibility = "hidden";
        }
        controlsPosition.style.visibility = "hidden";
        controlsZoom.style.visibility = "visible";
        controlsRotation.style.visibility = "hidden";
        toolsInfo.style.visibility = "hidden";
      }
    }

    function showRotationControls(event) {
      if (mq.matches) {
        event.target.removeEventListener("click", showRotationControls);
      } else {
        for (var i = 0; i < sliderFilters.length; i++) {
          sliderFilters[i].style.visibility = "hidden";
        }
        controlsPosition.style.visibility = "hidden";
        controlsZoom.style.visibility = "hidden";
        controlsRotation.style.visibility = "visible";
        toolsInfo.style.visibility = "hidden";
      }
    }

    togglePosition.addEventListener("click", showPositionControls, false);

    toggleZoom.addEventListener("click", showZoomControls, false);

    toggleRotation.addEventListener("click", showRotationControls, false);

    toggleGrayscale.addEventListener("click", function(event) {
      closeNav();
      for (var i = 0; i < sliderFilters.length; i++) {
        sliderFilters[i].style.visibility = "hidden";
      }
      closeControls();
      grayScaleBtns.style.visibility = "visible";
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


    // Put photo on canvas

    function drawNewImage() {
      ctx.clearRect(x, y, canvas.width, canvas.height);

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
      // canvas.width = width;
      // canvas.height = height;

      ctx.drawImage(userPhoto, x, y, userPhoto.width, userPhoto.height, x, y, canvas.width, canvas.height);
      ctx.clearRect(x, y, canvas.width, canvas.height);
    }


    // Upload a photo

    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(event) {
          userPhoto.setAttribute("src", event.target.result);

          var MAX_WIDTH = 300;
          var MAX_HEIGHT = 500;
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

    var inMemCanvas = document.createElement("canvas");
    var a = 0;
    var b = 0;
    var rotation;
    inMemCanvas.width = 210;
    inMemCanvas.height = 250;

    if (typeof rotation === "undefined") {
      rotation = 0;
    }

    function clearImage() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      userPhoto.style.display = "none";
    }

    function moveElementTop(event) {
      ctx.save();
      clearImage();

      ctx.rotate(0);
      ctx.translate(a, b -= 2);
      ctx.rotate(rotation);
      ctx.drawImage(userPhoto, a, b);
      ctx.restore();
    }

    function moveElementLeft(event) {
      ctx.save();
      clearImage();
      ctx.rotate(0);
      ctx.translate(a -= 2, b);
      ctx.drawImage(userPhoto, a, b);
      ctx.rotate(rotation);
      ctx.drawImage(userPhoto, a, b);
      ctx.restore();
    }

    function moveElementRight(event) {
      ctx.save();
      clearImage();
      ctx.rotate(0);
      ctx.translate(a += 2, b);
      ctx.drawImage(userPhoto, a, b);
      ctx.rotate(rotation);
      ctx.drawImage(userPhoto, a, b);
      ctx.restore();
    }

    function moveElementBottom(event) {
      ctx.save();
      clearImage();
      ctx.rotate(0);
      ctx.translate(a, b += 2);
      ctx.drawImage(userPhoto, a, b);
      ctx.rotate(rotation);
      ctx.drawImage(userPhoto, a, b);
      ctx.restore();
    }

    moveTop.addEventListener("click", moveElementTop, false);
    toolsLeftMoveTop.addEventListener("click", moveElementTop, false);

    moveLeft.addEventListener("click", moveElementLeft, false);
    toolsLeftMoveLeft.addEventListener("click", moveElementLeft, false);

    moveRight.addEventListener("click", moveElementRight, false);
    toolsLeftMoveRight.addEventListener("click", moveElementRight, false);

    moveBottom.addEventListener("click", moveElementBottom, false);
    toolsLeftMoveBottom.addEventListener("click", moveElementBottom, false);


    // Zoom-in, Zoom-out

    function zoomInElement(event) {
      clearImage();
      ctx.scale(0.99, 0.99);
      ctx.clearRect(x, y, canvas.width, canvas.height);
      userPhoto.style.display = "none";
      ctx.drawImage(userPhoto, x, y);
    }

    function zoomOutElement(event) {
      clearImage();
      ctx.scale(1.01, 1.01);
      ctx.clearRect(x, y, canvas.width, canvas.height);
      userPhoto.style.display = "none";
      ctx.drawImage(userPhoto, x, y);
    }

    zoomIn.addEventListener("click", zoomInElement, false);
    toolsLeftZoomIn.addEventListener("click", zoomInElement, false);

    zoomOut.addEventListener("click", zoomOutElement, false);
    toolsLeftZoomOut.addEventListener("click", zoomOutElement, false);


    // Rotation

    function rotateElement(event) {
      ctx.save();
      rotation += (15 * Math.PI / 180);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(93.5, 125.5); //rotating around the middle point of the photo
      ctx.rotate(rotation); //by 15deg
      ctx.translate(-93.5, -125.5); //rotating around the middle point of the photo
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      ctx.restore();
    }

    function rotateElementCCwise(event) {
      ctx.save();
      rotation -= (15 * Math.PI / 180);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(93.5, 125.5); //rotating around the middle point of the photo
      ctx.rotate(rotation); //by 15deg
      ctx.translate(-93.5, -125.5); //rotating around the middle point of the photo
      ctx.drawImage(userPhoto, x, y);
      userPhoto.style.display = "none";
      ctx.restore();
    }

    rotateControl.addEventListener("click", rotateElement, false);
    rotateCwise.addEventListener("click", rotateElement, false);
    rotateCCwise.addEventListener("click", rotateElementCCwise, false);


    // Get into pixel edition

    function manipulatePixels() {
      var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
      var data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
        var r = data[i]; //red
        var g = data[i + 1]; //green
        var b = data[i + 2]; //blue
        var a = data[i + 3]; //alpha
      }

      ctx.putImageData(data, x, y, userPhoto.width, userPhoto.height);

    }

    // Filters: Grayscale

    function grayScale(event) {

      var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
      var data = imageData.data;

      ctx.restore();

      for (var i = 0; i < data.length; i += 4) {
        var gray = (data[i] * .3) + (data[i + 1] * .6) + (data[i + 2] * .1);
        data[i] = gray; //red
        data[i + 1] = gray; //green
        data[i + 2] = gray; //blue
      }

      ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

      ctx.save();
    }

    grayScaleOn.addEventListener("click", grayScale, false);

    grayScaleOff.addEventListener("click", function(event) {
      ctx.clearRect(x, y, canvas.width, canvas.height);
      ctx.drawImage(userPhoto, x, y);
      
    }, false);


    // Filters: Brighten

    brightenRangeSlider.addEventListener("input", function(event) {

      var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
      var data = imageData.data;
      var brightenVal;


      if (brightenRangeSlider.oldValue === undefined) {
        brightenRangeSlider.oldValue = brightenRangeSlider.defaultValue;
      }

      brightenVal = brightenRangeSlider.value - brightenRangeSlider.oldValue;
      brightenRangeSlider.oldValue = brightenRangeSlider.value;

      ctx.restore();

      for (var i = 0; i < data.length; i += 4) {
        data[i] += brightenVal; // red
        data[i + 1] += brightenVal; // green
        data[i + 2] += brightenVal; // blue   
      }
      ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

      ctx.save();
    }, false);


    // Filters: Blur

    blurRangeSlider.addEventListener("input", function(event) {
      // var blurVal = blurRangeSlider.value / 3;

      // var passes = 1 * blurVal;
      // //ctx.restore();

      // ctx.globalAlpha = 1 / (blurVal * 2);
      // //overlay eight instances of the image over the original, each with 1/8th of full opacity
      // for (var i = 1; i <= passes; i++) {
      //   for (var y = -1; y < 2; y++) {
      //     for (var x = -1; x < 2; x++) {
      //       ctx.drawImage(userPhoto, x, y);
      //     }
      //   }
      // }
      // ctx.globalAlpha = 1.0 * blurVal;
      //ctx.save();
      var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
      var data = imageData.data;


      ctx.filter = 'invert(100%)';

      ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

    }, false);


    // Filters: Negative

    negativeRangeSlider.addEventListener("input", function(event) {

      ctx.restore();

      var imageData = ctx.getImageData(x, y, canvas.width, canvas.height);
      var data = imageData.data;
      var negativeVal = negativeRangeSlider.value * 3;

      for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i] - negativeVal; // red
        data[i + 1] = 255 - data[i + 1] - negativeVal; // green
        data[i + 2] = 255 - data[i + 2] - negativeVal; // blue
        //          data[i + 3] = 255 - data[i + 3] * negativeVal * 0.9; // alpha
      }

      ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

    }, false);

    // Reset

    resetBtn.addEventListener("click", function(event) {
      ctx.save();
      ctx.rotate(rotation);
      ctx.clearRect(x - 1, y - 1, canvas.width + 2, canvas.height + 2); //added offsets to clear tidbits
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
      console.log("ok");
    }, false);



  });