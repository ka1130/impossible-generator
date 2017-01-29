document.addEventListener("DOMContentLoaded", function(event) {

  //Define variables

  //(on smaller screens) menu icons
  var togglePosition = document.getElementById("togglePosition");
  var toggleZoom = togglePosition.nextElementSibling;

  //dropdown filters menu (on smaller screens)
  var toolsNav = document.getElementById("toolsNav");
  var toggleGrayscale = toolsNav.firstElementChild.children[1]; //menu option grayscale
  var toggleBrightness = toggleGrayscale.nextElementSibling; //menu option brightness
  var toggleBlur = toggleBrightness.nextElementSibling; //menu option blur
  var toggleNegative = toggleBlur.nextElementSibling; //menu option negative
  var toggleEdgeDetect = toggleNegative.nextElementSibling; //menu option edge-detect
  var toggleSharpen = toggleEdgeDetect.nextElementSibling; //menu option negative
  var toggleEmboss = toggleSharpen.nextElementSibling; //menu option negative
  // last menu icon on smaller screens (open dropdown filters menu)
  var openFiltersNav = document.getElementById("openFiltersNav");
  //close dropdown filters menu
  var closeFiltersNav = toolsNav.firstElementChild.firstElementChild;

  //(on smaller screens) tools in the panel below image
  var controlsPosition = document.getElementsByClassName("controls-position")[0];
  var controlsZoom = controlsPosition.nextElementSibling;

  //grayscale buttons
  var grayScaleBtns = document.getElementById("grayScale");
  var grayScaleBtnsWrapper = grayScaleBtns.children[0];
  var grayScaleOn = grayScaleBtnsWrapper.children[0];
  var grayScaleOff = grayScaleOn.nextElementSibling;

  //brighten, blur, play divs 
  var brightenDiv = document.getElementById("brighten-range");
  var blurDiv = document.getElementById("blur-range");
  var sharpenDiv =  document.getElementById("sharpen-range");

  //negative buttons
  var negativeBtns = document.getElementsByClassName("scale-btns")[1]; //div z przyciskami on/off
  var negativeOn = negativeBtns.children[0].children[0];
  var negativeOff = negativeOn.nextElementSibling;

  //edge-detect buttons
  var edgeDetectBtns = document.getElementsByClassName("scale-btns")[2]; //div z przyciskami on/off
  var edgeDetectOn = edgeDetectBtns.children[0].children[0];
  var edgeDetectOff = edgeDetectOn.nextElementSibling;

  //emboss buttons
  var embossBtns = document.getElementsByClassName("scale-btns")[3]; //div z przyciskami on/off
  var embossOn = embossBtns.children[0].children[0];
  var embossOff = embossOn.nextElementSibling;

  var sliderFilters = document.getElementsByClassName("slider-filter");

  var toolsInfo = document.getElementsByClassName("tools-info")[0];

  //filter sliders
  var brightenRangeSlider = document.getElementById("brightenRange");
  var blurRangeSlider = document.getElementById("blurRange");
  var sharpenRangeSlider = document.getElementById("sharpenRange");

  //variables for image and canvas
  var imgContainer = document.getElementById("imgContainer");
  var userPhoto = document.getElementById("userPhoto"); //user photo
  var currentPhoto = new Image; //working copy of the photo with all changes included
  var inputFile = document.getElementById("inputFile");
  var uploadPhoto = document.getElementById("uploadPhoto"); //upload button
  var canvas = document.getElementById("imgCanvas");
  var ctx = canvas.getContext("2d");
  var resetBtn = document.getElementById("resetBtn"); //reset button
  var download = document.getElementById("download"); //get it button

  //controls/buttons in the lower menu (on smaller screens)
  var moveTop = document.getElementById("moveTop");
  var moveRight = document.getElementById("moveRight");
  var moveLeft = document.getElementById("moveLeft");
  var moveBottom = document.getElementById("moveBottom");
  var zoomIn = document.getElementById("zoom-in");
  var zoomOut = document.getElementById("zoom-out");

  //button on the left-hand panel (on bigger screens)
  var toolsLeftMoveTop = document.getElementById("toolsLeftMoveTop");
  var toolsLeftMoveLeft = document.getElementById("toolsLeftMoveLeft");
  var toolsLeftMoveRight = document.getElementById("toolsLeftMoveRight");
  var toolsLeftMoveBottom = document.getElementById("toolsLeftMoveBottom");
  var toolsLeftZoomIn = document.getElementById("toolsLeftZoomIn");
  var toolsLeftZoomOut = document.getElementById("toolsLeftZoomOut");

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
        "left": offsetLeft - 16,
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
  var opened;

  function openNav() {
    if (typeof opened === "undefined") {
      opened = false;
    }
    if (window.matchMedia("(min-width: 480px)").matches && opened == false) {
      toolsNav.style.visibility = "visible";
      toolsNav.style.height = "100%";
      opened = true;
    } else if (window.matchMedia("(min-width: 480px)").matches && opened == true) {
      toolsNav.style.visibility = "hidden";
      toolsNav.style.height = "0";
      opened = false;
    }
    if (window.matchMedia("(max-width: 479px)").matches) {
      toolsNav.style.visibility = "visible";
      toolsNav.style.height = "100%";
    } else if (window.matchMedia("(max-width: 479px)").matches) {
      toolsNav.style.visibility = "hidden";
      toolsNav.style.height = "0";
    }
  }

  function closeNav(event) {
    event.preventDefault();
    if (window.matchMedia("(max-width: 479px)").matches) {
      toolsNav.style.height = "0%";
    }
  }

  function closeControls() {
    controlsPosition.style.visibility = "hidden";
    controlsZoom.style.visibility = "hidden";
    toolsInfo.style.visibility = "hidden";
    brightenDiv.style.visibility = "hidden";
    sharpenDiv.style.visibility = "hidden"
    grayScaleBtns.style.visibility = "hidden";
    blurDiv.style.visibility = "hidden";
    negativeBtns.style.visibility = "hidden";
    edgeDetectBtns.style.visibility = "hidden";
    embossBtns.style.visibility = "hidden";
  }


  openFiltersNav.addEventListener("click", openNav, false);
  closeFiltersNav.addEventListener("click", closeNav, false);


  // Toggle bottom panel tools
  // Disable unnecessary buttons on bigger screens

  var mq = window.matchMedia("(min-width: 571px)");

  if (mq.matches) {
    $("#togglePosition").attr("disabled", true);
    $("#toggleZoom").attr("disabled", true);
    $("#togglePosition").css({
      "cursor": "auto"
    });
    $("#toggleZoom").css({
      "cursor": "auto"
    });
    toolsInfo.innerHTML = "choose your tool in the left-hand panel";
  }

  function showPositionControls(event) {
    if (mq.matches) {
      event.target.removeEventListener("click", showPositionControls);
    } else {
      controlsPosition.style.visibility = "visible";
    }
    saveCurrentPhoto();
  }

  function showZoomControls(event) {
    if (mq.matches) {
      event.target.removeEventListener("click", showZoomControls);
    } else {
      controlsZoom.style.visibility = "visible";
      closeControls();
    }
    saveCurrentPhoto();
  }

  togglePosition.addEventListener("click", showPositionControls, false);

  toggleZoom.addEventListener("click", showZoomControls, false);

  toggleGrayscale.addEventListener("click", function(event) {
    closeNav(event);
    closeControls();
    grayScaleBtns.style.visibility = "visible";
    saveCurrentPhoto();
  }, false);

  toggleBrightness.addEventListener("click", function(event) {
    closeNav(event);
    closeControls();
    brightenDiv.style.visibility = "visible";
    saveCurrentPhoto();
  }, false);

  toggleBlur.addEventListener("click", function(event) {
    closeNav(event);
    closeControls();
    blurDiv.style.visibility = "visible";
    saveCurrentPhoto();
  }, false);

  toggleNegative.addEventListener("click", function(event) {
    closeNav(event);
    closeControls();
    negativeBtns.style.visibility = "visible";
    saveCurrentPhoto();
  }, false);

  toggleEdgeDetect.addEventListener("click", function(event) {
    closeNav(event);
    closeControls();
    edgeDetectBtns.style.visibility = "visible";
    saveCurrentPhoto();
  }, false);

  toggleSharpen.addEventListener("click", function(event) {
    closeNav(event);
    closeControls();
    sharpenDiv.style.visibility = "visible";
    saveCurrentPhoto();
  }, false);

  toggleEmboss.addEventListener("click", function(event) {
    closeNav(event);
    closeControls();
    embossBtns.style.visibility = "visible";
    saveCurrentPhoto();
  }, false);


  // Scrolling to sections

  $("#scroll").on("click", function(event) {
    event.preventDefault();

    if (window.matchMedia("(max-width: 700px)").matches) {
      $("html, body").animate({
        scrollTop: $("#about").offset().top
      }, "slow");
    } else {
      $("html, body").animate({
        scrollTop: 411
      }, "slow");
    }
    return false;
  });

  $("#about a").on("click", function(event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: $(document).height()
    }, 1200);
    return false;
  });

  $("#toTop").on("click", function(event) {
    $("body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });

  $(document).on("scroll", function(event) {
    if ($("body").scrollTop() > 411) {
    } 
  });

  $("#about").find("div").children().eq(1).on("click", function(event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: $("#interlude").offset().top
    }, "slow");
    return false;
  });

  console.log($("body").scrollTop());

  $("#interlude").find("p").on("click", function(event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: $("#generator").offset().top
    }, "slow");
    return false;
  });

  // Move

  var inMemCanvas = document.createElement("canvas");
  var a = 0;
  var b = 0;

  var currentScale = 1;
  
  inMemCanvas.width = 210;
  inMemCanvas.height = 250;

  
  function clearImage() {
    ctx.clearRect(0, 0, inMemCanvas.width, inMemCanvas.height);
    userPhoto.style.display = "none";
  }

  function moveElement(direction) {
    clearImage();
  
  switch (direction) {
    case "top":
      b -= 2;
      break;
    
    case "bottom":
      b += 2;
      break;
    
    case "left":
      a -= 2;
      break;
    
    case "right":
      a += 2;
      break;
  }
  
  ctx.drawImage(currentPhoto, a, b, inMemCanvas.width * currentScale, inMemCanvas.height * currentScale);
  }
  
  function moveElementTop(event) {
    moveElement("top");
  }

  function moveElementLeft(event) {
    moveElement("left");
  }

  function moveElementRight(event) {
    moveElement("right");
  }

  function moveElementBottom(event) {
    moveElement("bottom");
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
  currentScale -= 0.1;
    userPhoto.style.display = "none";
    ctx.drawImage(currentPhoto, a, b, inMemCanvas.width * currentScale, inMemCanvas.height * currentScale);
  }

  function zoomOutElement(event) {
    clearImage();
  currentScale += 0.1;
    userPhoto.style.display = "none";
    ctx.drawImage(currentPhoto, a, b, inMemCanvas.width * currentScale, inMemCanvas.height * currentScale);
  }

  zoomIn.addEventListener("click", zoomInElement, false);
  toolsLeftZoomIn.addEventListener("click", zoomInElement, false);

  zoomOut.addEventListener("click", zoomOutElement, false);
  toolsLeftZoomOut.addEventListener("click", zoomOutElement, false);


  // Upload a photo

  canvas.width = 210;
  canvas.height = 250;

  function readURL(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
    
      reader.onload = function(event) {
    
    clearImage();
    
    var tempPhoto = new Image;
    tempPhoto.src = event.target.result;

        var MAX_WIDTH = 210;
        var MAX_HEIGHT = 250;
        var width = tempPhoto.width;
        var height = tempPhoto.height;
    
    var offsetX = 0;
    var offsetY = 0;
    var aspectRatio = 0;
    
    if (width > height) {
      aspectRatio = (height / width) * 100;
    } else {
      aspectRatio = (width / height) * 100;
    }
    
    aspectRatio = Math.round(aspectRatio) / 100;
    
    if (width >= height) {
          if (width > MAX_WIDTH) {
            width = MAX_WIDTH;
            height = width * aspectRatio;
      offsetY = (MAX_HEIGHT - height) / 2;
      console.log(height + (offsetX * 2));
          }
        } else {
          if (height > MAX_HEIGHT) {
            height = MAX_HEIGHT;
            width = height * aspectRatio;
      offsetX = (MAX_WIDTH - width) / 2;
      console.log(width + (offsetY * 2));
          }
        }
    
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempPhoto, offsetX, offsetY, width, height);

        var dataurl = canvas.toDataURL("image/png");
        userPhoto.setAttribute("src", dataurl);

        saveCurrentPhoto();

      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#inputFile").change(function(event) {
    readURL(this);
    $("#resetBtn").next().hide(); //hide "drag&drop" text
  });

  uploadPhoto.addEventListener("click", function(event) {
    $("#inputFile").trigger("click");
  }, false);

  // Filters: GrayScale

  grayScaleOn.addEventListener("click", grayScale, false);

  grayScaleOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(currentPhoto, x, y);

  }, false);


  // Filters: Brighten

  brightenRangeSlider.addEventListener("input", brightenImage, false);


  // Filters: Blur

  blurRangeSlider.addEventListener("input", function(event) {
    var iterations = blurRangeSlider.value;
    var imageData = Filters.filterImage(Filters.blur, currentPhoto, iterations);
    ctx.putImageData(imageData, x, y, x, y, currentPhoto.width, currentPhoto.height);

  }, false);


  // Filters: Negative

  negativeOn.addEventListener("click", negativeFilter, false);

  negativeOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(currentPhoto, x, y);
    inverted = false;
  }, false);


  // Filters: Edge Detect

  edgeDetectOn.addEventListener("click", function(event) {
    var imageData = Filters.filterImage(Filters.sobel, currentPhoto);
    ctx.putImageData(imageData, x, y, x, y, currentPhoto.width, currentPhoto.height);
  }, false);

  edgeDetectOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(currentPhoto, x, y);
  }, false);


  //Filters: Funscale

  sharpenRangeSlider.addEventListener("input", function(event) {
    var iterations = sharpenRangeSlider.value;
    var imageData = Filters.filterImage(Filters.sharpen, currentPhoto, iterations);
    ctx.putImageData(imageData, x, y, x, y, currentPhoto.width, currentPhoto.height);

  }, false);


  // Filters: Emboss

  embossOn.addEventListener("click", function(event) {
    var imageData = Filters.filterImage(Filters.emboss, currentPhoto);
    ctx.putImageData(imageData, x, y, x, y, currentPhoto.width, currentPhoto.height);
  }, false);

  embossOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(currentPhoto, x, y);
  }, false);


  // Reset

  resetBtn.addEventListener("click", function(event) {
    ctx.save();
    ctx.clearRect(x - 1, y - 1, canvas.width + 2, canvas.height + 2); //added offsets to clear tidbits
    ctx.restore();
    ctx.drawImage(userPhoto, 0, 0, canvas.width, canvas.height);
    saveCurrentPhoto();
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

    ctx.rect(0, 0, canvas.width, 30);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    // ctx.shadowColor = '#999';
    // ctx.shadowBlur = 20;
    // ctx.shadowOffsetX = 15;
    // ctx.shadowOffsetY = 15;
    ctx.drawImage(currentPhoto, x, x, canvas.width - 2 * x, canvas.height - 2 * x - 50);
  }

  download.addEventListener("click", function(event) {
    saveCurrentPhoto();
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


  // Drag & Drop

  var dropzone = $("#imgContainer");

  dropzone.on("dragover", function() {
    //add hover class when drag over
    dropzone.addClass("hover");
    return false;
  });

  dropzone.on("dragleave", function(event) {
    //remove hover class when drag out
    dropzone.removeClass("hover");
    return false;
  });

  dropzone.on("drop", function(event) {
    //prevent browser from open the file when drop off
    event.stopPropagation();
    event.preventDefault();
    dropzone.removeClass("hover");
    $("#resetBtn").next().hide();
    //retrieve uploaded files data
    var files = event.originalEvent.dataTransfer;
    processFiles(files);

    return false;
  });

  function processFiles(files) {
    //check for browser support 
    if (files && typeof FileReader !== "undefined") {
      //extract FileList as File object
      readURL(files);
    } else {
      //some message or fallback
      console.log("drag error");
    }
  }

  function saveCurrentPhoto() {
    ctx.save();
    currentPhoto.src = canvas.toDataURL("image/png");
  }

  //end
});