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