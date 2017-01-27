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
  // last menu icon on smaller screens (open dropdown filters menu)
  var openFiltersNav = document.getElementById("openFiltersNav");
  //close dropdown filters menu
  var closeFiltersNav = toolsNav.firstElementChild.firstElementChild;

  //(on smaller screens) tools in the panel below image
  var controlsPosition = document.getElementsByClassName("controls-position")[0];
  var controlsZoom = controlsPosition.nextElementSibling;

  //grayscale buttons
  var grayScaleBtns = document.getElementsByClassName("scale-btns")[0];
  var grayScaleBtnsWrapper = grayScaleBtns.children[1];
  var grayScaleOn = grayScaleBtnsWrapper.children[0];
  var grayScaleOff = grayScaleOn.nextElementSibling;

  //brighten, blur divs 
  var brightenDiv = document.getElementById("brighten-range");
  var blurDiv = document.getElementById("blur-range");

  //negative buttons
  var negativeBtns = document.getElementsByClassName("scale-btns")[1]; //div z przyciskami on/off
  var negativeOn = negativeBtns.children[1].children[0];
  var negativeOff = negativeOn.nextElementSibling;

  var sliderFilters = document.getElementsByClassName("slider-filter");

  var toolsInfo = document.getElementsByClassName("tools-info")[0];

  //filter sliders
  var brightenRangeSlider = document.getElementById("brightenRange");
  var blurRangeSlider = document.getElementById("blurRange");

  //variables for image and canvas
  var imgContainer = document.getElementById("imgContainer");
  var userPhoto = document.getElementById("userPhoto"); //user photo
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