(function() {
  document.addEventListener("DOMContentLoaded", function(event) {



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
        closeControls();
        controlsPosition.style.visibility = "visible";
      }
      saveCurrentPhoto();
    }


    function showZoomControls(event) {
      if (mq.matches) {
        event.target.removeEventListener("click", showZoomControls);
      } else {
        closeControls();
        controlsZoom.style.visibility = "visible";
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
      if ($("body").scrollTop() > 411) {}
    });

    $("#about").find("div").children().eq(1).on("click", function(event) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $("#interlude").offset().top
      }, "slow");
      return false;
    });

    $("#interlude").find("p").on("click", function(event) {
      event.preventDefault();
      $("html, body").animate({
        scrollTop: $("#generator").offset().top
      }, "slow");
      return false;
    })


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
            }
          } else {
            if (height > MAX_HEIGHT) {
              height = MAX_HEIGHT;
              width = height * aspectRatio;
              offsetX = (MAX_WIDTH - width) / 2;
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


    //Filters: Sharpen

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

})();