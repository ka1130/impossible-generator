function grayScale(event) {
    event.stopPropagation();
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

function brightenImage(event) {
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
}

function negativeFilter(event) {
    event.stopImmediatePropagation();

    var imageData = ctx.getImageData(x, y, canvas.width, canvas.height);
    var data = imageData.data;

    ctx.restore();

    for (var i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
    console.log("ok");
    ctx.putImageData(imageData, x, y, x, y, userPhoto.width, userPhoto.height);
    ctx.save();
  }


// Library

Filters = {};

Filters.getPixels = function(img) {
  var c = this.getCanvas(img.width, img.height);
  var ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, c.width, c.height);
};

Filters.getCanvas = function(w,h) {
  var c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

Filters.filterImage = function(filter, image, var_args) {
  var args = [this.getPixels(image)];
  for (var i=2; i<arguments.length; i++) {
    args.push(arguments[i]);
  }
  return filter.apply(null, args);
};

Filters.grayscale = function(pixels, args) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};

Filters.brightness = function(pixels, adjustment) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    d[i] += adjustment;
    d[i+1] += adjustment;
    d[i+2] += adjustment;
  }
  return pixels;
};

Filters.threshold = function(pixels, threshold) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};

Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
  return this.tmpCtx.createImageData(w,h);
};

Filters.convolute = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};

Filters.blur = function (pixels, iterations) {
  var convMatrix = [ 1/9, 1/9, 1/9,
            1/9, 1/9, 1/9,
            1/9, 1/9, 1/9 ];
            
  for(var i = 0; i < iterations; i++) {
    pixels = Filters.convolute(pixels, convMatrix);
  }
  
  return pixels;
}

Filters.edgeDetect = function (pixels) {
  var convMatrix = [ 0, 1, 0,
            1, -4, 1,
            0, 1, 0 ];
    
  return Filters.convolute(pixels, convMatrix);;
}

Filters.emboss = function (pixels) {
  var convMatrix = [ -2, -1, 0,
            -1, 1, 1,
            0, 1, 2 ];
    
  return Filters.convolute(pixels, convMatrix);;
}

Filters.sharpen = function (pixels) {
  var convMatrix = [ 0, -1, 0,
            -1, 5, -1,
            0, -1, 0 ];
    
  return Filters.convolute(pixels, convMatrix);;
}

