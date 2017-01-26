  //Define variables

  //(na mniejszych ekranach) ikony menu
  var togglePosition = document.getElementById("togglePosition");
  var toggleZoom = togglePosition.nextElementSibling;
  var toggleRotation = toggleZoom.nextElementSibling;

  //rozwijane menu z filtrami (na mniejszych ekranach)
  var toolsNav = document.getElementById("toolsNav");
  var toggleGrayscale = toolsNav.firstElementChild.children[1]; //opcja menu grayscale
  var toggleBrightness = toggleGrayscale.nextElementSibling; //opcja menu brightness
  var toggleBlur = toggleBrightness.nextElementSibling; //opcja menu blur
  var toggleNegative = toggleBlur.nextElementSibling; //opcja menu negative
  // ostatnia ikona w menu na mniejszych ekranach (otwieranie rozwijanego menu z filtrami)
  var openFiltersNav = document.getElementById("openFiltersNav");
  //przycisk zamknięcia rozwijanego menu
  var closeFiltersNav = toolsNav.firstElementChild.firstElementChild;

  //(na mniejszych ekranach) narzędzia w panelu pod obrazkiem
  var controlsPosition = document.getElementsByClassName("controls-position")[0];
  var controlsZoom = controlsPosition.nextElementSibling;
  var controlsRotation = controlsZoom.nextElementSibling;

  //przyciski negative
  var negativeBtns = document.getElementsByClassName("scale-btns")[1]; //div z przyciskami on/off
  var negativeOn = negativeBtns.children[1].children[0];
  var negativeOff = negativeOn.nextElementSibling;

  var sliderFilters = document.getElementsByClassName("slider-filter");
  var grayScaleBtns = document.getElementsByClassName("scale-btns")[0];
  var grayScaleBtnsWrapper = grayScaleBtns.children[1];
  var grayScaleOn = grayScaleBtnsWrapper.children[0];
  var grayScaleOff = grayScaleOn.nextElementSibling;

  var toolsInfo = controlsRotation.parentElement.lastElementChild;

  //suwaki do filtrów
  var brightenRangeSlider = document.getElementById("brightenRange");
  var blurRangeSlider = document.getElementById("blurRange");

  //zmienne dla obrazka i jego obsługi
  var imgContainer = document.getElementById("imgContainer");
  var userPhoto = document.getElementById("userPhoto"); //zdjęcie użytkownika
  var inputFile = document.getElementById("inputFile");
  var uploadPhoto = document.getElementById("uploadPhoto"); //przycisk upload
  var canvas = document.getElementById("imgCanvas");
  var ctx = canvas.getContext("2d");
  var resetBtn = document.getElementById("resetBtn"); //przycisk reset
  var download = document.getElementById("download"); //przycisk Get it

  //przyciski w panelu dolnym (na mniejszych ekranach)
  var moveTop = document.getElementById("moveTop");
  var moveRight = document.getElementById("moveRight");
  var moveLeft = document.getElementById("moveLeft");
  var moveBottom = document.getElementById("moveBottom");
  var zoomIn = document.getElementById("zoom-in");
  var zoomOut = document.getElementById("zoom-out");
  var rotateControl = document.querySelector(".rotation-circle");

  //przyciski w panelu po lewej stronie (na większych ekranach)
  var toolsLeftMoveTop = document.getElementById("toolsLeftMoveTop");
  var toolsLeftMoveLeft = document.getElementById("toolsLeftMoveLeft");
  var toolsLeftMoveRight = document.getElementById("toolsLeftMoveRight");
  var toolsLeftMoveBottom = document.getElementById("toolsLeftMoveBottom");
  var toolsLeftZoomIn = document.getElementById("toolsLeftZoomIn");
  var toolsLeftZoomOut = document.getElementById("toolsLeftZoomOut");
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