// Move

  var inMemCanvas = document.createElement("canvas");
  var a = 0;
  var b = 0;

  inMemCanvas.width = 210;
  inMemCanvas.height = 250;


  function clearImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    userPhoto.style.display = "none";
  }

  function moveElementTop(event) {
    ctx.save();
    clearImage();
    ctx.translate(a, b -= 2);
    ctx.drawImage(userPhoto, a, b);
    ctx.restore();
  }

  function moveElementLeft(event) {
    ctx.save();
    clearImage();
    ctx.translate(a -= 2, b);
    ctx.drawImage(userPhoto, a, b);
    ctx.drawImage(userPhoto, a, b);
    ctx.restore();
  }

  function moveElementRight(event) {
    ctx.save();
    clearImage();
    ctx.translate(a += 2, b);
    ctx.drawImage(userPhoto, a, b);
    ctx.drawImage(userPhoto, a, b);
    ctx.restore();
  }

  function moveElementBottom(event) {
    ctx.save();
    clearImage();
    ctx.translate(a, b += 2);
    ctx.drawImage(userPhoto, a, b);
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








