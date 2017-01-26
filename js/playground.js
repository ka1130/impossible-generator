function grayScalePlay(event) {
    // drawNewImage();
    var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
    var data = imageData.data;
    var val = grayscaleRangeSlider.value;
    var oldVal = grayscaleRangeSlider.oldValue;

    if (typeof oldVal == "undefined") {
        oldVal = 10;
    };

    ctx.restore();

    val = (val - oldVal); //* 0.00003
    oldVal = val;

    for (var i = 0; i < data.length; i += 4) {
        var gray = (data[i] * .3) + (data[i + 1] * .6) + (data[i + 2] * .1);
        data[i] = gray - (val * 0.1111); //red
        data[i + 1] = gray + (val * 1.0000011); //green
        data[i + 2] = gray - (val * 0.11141); //blue
    }

    ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

    ctx.save();
}

// Filters: Funscale

function funScale(event) {
    // drawNewImage();
    var imageData = ctx.getImageData(x, y, userPhoto.width, userPhoto.height);
    var data = imageData.data;
    var val = grayscaleRangeSlider.value;
    var oldVal = grayscaleRangeSlider.oldValue;

    if (typeof oldVal == "undefined") {
        oldVal = 1;
    };

    ctx.restore();

    val = (val - oldVal);
    oldVal = val;

    for (var i = 0; i < data.length; i += 4) {
        var gray = (data[i] * .3) + (data[i + 1] * .6) + (data[i + 2] * .1);
        data[i] += gray + (val * 0.01); //red
        data[i + 1] = gray; //green
        data[i + 2] = gray; //blue
    }

    ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);

    ctx.save();
}


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