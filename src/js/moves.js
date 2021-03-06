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
       b -= 5;
       break;

     case "bottom":
       b += 5;
       break;

     case "left":
       a -= 5;
       break;

     case "right":
       a += 5;
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

 // Filters: GrayScale

 grayScaleOn.addEventListener("click", grayScale, false);

 grayScaleOff.addEventListener("click", function(event) {
   ctx.clearRect(x, y, canvas.width, canvas.height);
   ctx.drawImage(currentPhoto, x, y);

 }, false);