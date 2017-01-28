document.addEventListener("DOMContentLoaded", function(event) {


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
    } else {
      $("#toTop").hide();
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
    $("#toTop").hide();
  }

  function closeNav() {
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
  }

  function showZoomControls(event) {
    if (mq.matches) {
      event.target.removeEventListener("click", showZoomControls);
    } else {
      controlsZoom.style.visibility = "visible";
      closeControls();
    }
  }

  togglePosition.addEventListener("click", showPositionControls, false);

  toggleZoom.addEventListener("click", showZoomControls, false);

  toggleGrayscale.addEventListener("click", function(event) {
    closeNav();
    closeControls();
    grayScaleBtns.style.visibility = "visible";
  }, false);

  toggleBrightness.addEventListener("click", function(event) {
    closeNav();
    closeControls();
    brightenDiv.style.visibility = "visible";
  }, false);

  toggleBlur.addEventListener("click", function(event) {
    closeNav();
    closeControls();
    blurDiv.style.visibility = "visible";
  }, false);

  toggleNegative.addEventListener("click", function(event) {
    closeNav();
    closeControls();
    negativeBtns.style.visibility = "visible";
  }, false);

  toggleEdgeDetect.addEventListener("click", function(event) {
    closeNav();
    closeControls();
    edgeDetectBtns.style.visibility = "visible";
  }, false);

  toggleSharpen.addEventListener("click", function(event) {
    closeNav();
    closeControls();
    sharpenDiv.style.visibility = "visible";
  }, false);

  toggleEmboss.addEventListener("click", function(event) {
    closeNav();
    closeControls();
    embossBtns.style.visibility = "visible";
  }, false);


  // Scrolling to sections

  $("#scroll").on("click", function(event) {
    event.preventDefault();
    $("body").animate({
      scrollTop: 411
    }, 500);
    return false;
  });

  $("#about a").on("click", function(event) {
    event.preventDefault();
    $("body").animate({
      scrollTop: 1626
    }, 800);
    return false;
  });

  $("#toTop").on("click", function(event) {
    $("body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });

  $("#toTop").hide();

  $(document).on("scroll", function(event) {
    if ($("body").scrollTop() > 411) {
      $("#toTop").show();
    } else {
      $("#toTop").hide();
    }
  });


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

  $("#inputFile").change(function(event) {
    readURL(this);
    drawNewImage();
    ctx.save();
  });

  uploadPhoto.addEventListener("click", function(event) {
    $("#inputFile").trigger("click");
  }, false);

  // Filters: GrayScale

  grayScaleOn.addEventListener("click", grayScale, false);

  grayScaleOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(userPhoto, x, y);

  }, false);


  // Filters: Brighten

  brightenRangeSlider.addEventListener("input", brightenImage, false);


  // Filters: Blur

  blurRangeSlider.addEventListener("input", function(event) {
    var iterations = blurRangeSlider.value;
    var imageData = Filters.filterImage(Filters.blur, userPhoto, iterations);
    ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

  }, false);


  // Filters: Negative

  negativeOn.addEventListener("click", negativeFilter, false);

  negativeOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(userPhoto, x, y);
  }, false);


  // Filters: Edge Detect

  edgeDetectOn.addEventListener("click", function(event) {
    var imageData = Filters.filterImage(Filters.sobel, userPhoto);
    ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);
  }, false);

  edgeDetectOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(userPhoto, x, y);
  }, false);


  //Filters: Funscale

  sharpenRangeSlider.addEventListener("input", function(event) {
    var iterations = sharpenRangeSlider.value;
    var imageData = Filters.filterImage(Filters.sharpen, userPhoto, iterations);
    ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

  }, false);


  // Filters: Emboss

  embossOn.addEventListener("click", function(event) {
    var imageData = Filters.filterImage(Filters.emboss, userPhoto);
    ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);
  }, false);

  embossOff.addEventListener("click", function(event) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
    ctx.drawImage(userPhoto, x, y);
  }, false);


  // Reset

  resetBtn.addEventListener("click", function(event) {
    ctx.save();
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


  var dropzone = $("#resetBtn").next();

  dropzone.on('dragover', function() {
    //add hover class when drag over
    dropzone.addClass('hover');
    return false;
  });

  dropzone.on('dragleave', function() {
    //remove hover class when drag out
    dropzone.removeClass('hover');
    return false;
  });

  dropzone.on('drop', function(e) {
    //prevent browser from open the file when drop off
    e.stopPropagation();
    e.preventDefault();
    dropzone.removeClass('hover');
     $("#inputFile").trigger("click");
    //retrieve uploaded files data
    var files = e.originalEvent.dataTransfer.files;


    return false;
  });



  //end
});