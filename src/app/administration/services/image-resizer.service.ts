import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageResizerService {

  constructor() { }

  resizeImage(file: any, maxwidth: number, maxheight: number, Blob: boolean) {
    return this.resizer(file, maxwidth, maxheight)
    // .then(urlString => {
    //     if(Blob) {
    //         return this.b64toBlob(urlString);
    //     } else {
    //         return urlString;
    //     }
    // });
  }

  private resizer(file: any, maxW: number, maxH: number) {
    return new Promise((resolve) => {
      //var canvas = document.createElement('canvas');
      // var context = canvas.getContext('2d');

      var canvas = document.createElement('canvas');
      var ctx1 = canvas.getContext('2d');

      var img = document.createElement('img');
      let URLi;

      img.onload = function() {
        var W = img.width;
        var H = img.height;
        canvas.width = W;
        canvas.height = H;
        ctx1.drawImage(img, 0, 0);
        var iw = img.width;
        var ih = img.height;
        var scale = Math.min((maxW / iw), (maxH / ih));
        var iwScaled = iw * scale;
        var ihScaled = ih * scale;
        // canvas.width = iwScaled;
        // canvas.height = ihScaled;
        console.log('part 1')
    var width_source = canvas.width;
    var height_source = canvas.height;
    var width = Math.round(iwScaled);
    var height = Math.round(ihScaled);

    var ratio_w = width_source / width;
    var ratio_h = height_source / height;
    var ratio_w_half = Math.ceil(ratio_w / 2);
    var ratio_h_half = Math.ceil(ratio_h / 2);

    var ctx = canvas.getContext("2d");
    var imgold = ctx.getImageData(0, 0, width_source, height_source);
    var img2 = ctx.createImageData(width, height);
    var data = imgold.data;
    var data2 = img2.data;
    console.log('part 2')
    for (var j = 0; j < height; j++) {
        for (var i = 0; i < width; i++) {
            var x2 = (i + j * width) * 4;
            var weight = 0;
            var weights = 0;
            var weights_alpha = 0;
            var gx_r = 0;
            var gx_g = 0;
            var gx_b = 0;
            var gx_a = 0;
            var center_y = (j + 0.5) * ratio_h;
            var yy_start = Math.floor(j * ratio_h);
            var yy_stop = Math.ceil((j + 1) * ratio_h);
            for (var yy = yy_start; yy < yy_stop; yy++) {
                var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                var center_x = (i + 0.5) * ratio_w;
                var w0 = dy * dy; //pre-calc part of w
                var xx_start = Math.floor(i * ratio_w);
                var xx_stop = Math.ceil((i + 1) * ratio_w);
                for (var xx = xx_start; xx < xx_stop; xx++) {
                    var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                    var w = Math.sqrt(w0 + dx * dx);
                    if (w >= 1) {
                        //pixel too far
                        continue;
                    }
                    //hermite filter
                    weight = 2 * w * w * w - 3 * w * w + 1;
                    var pos_x = 4 * (xx + yy * width_source);
                    //alpha
                    gx_a += weight * data[pos_x + 3];
                    weights_alpha += weight;
                    //colors
                    if (data[pos_x + 3] < 255)
                        weight = weight * data[pos_x + 3] / 250;
                    gx_r += weight * data[pos_x];
                    gx_g += weight * data[pos_x + 1];
                    gx_b += weight * data[pos_x + 2];
                    weights += weight;
                }
            }
            data2[x2] = gx_r / weights;
            data2[x2 + 1] = gx_g / weights;
            data2[x2 + 2] = gx_b / weights;
            data2[x2 + 3] = gx_a / weights_alpha;
          }
        }
        console.log('part 3')
        //clear and resize canvas
        //if (resize_canvas === true) {
            canvas.width = width;
            canvas.height = height;
        //} else {
        //    ctx.clearRect(0, 0, width_source, height_source);
        //}

        //draw
        ctx.putImageData(img2, 0, 0);
        //https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality

        

        // var iwScaled = iw * scale;
        // var ihScaled = ih * scale;
        // canvas.width = iwScaled;
        // canvas.height = ihScaled;
        // context.imageSmoothingQuality = "high";
        // //context.imageSmoothingEnabled = false;
        // console.log(context)
        // context.drawImage(img, 0, 0, iwScaled, ihScaled);
  //document.body.innerHTML+=canvas.toDataURL();
        URLi = canvas.toDataURL();
        console.log('part 4')
        return resolve(URLi)
      }
      return img.src = URL.createObjectURL(file);
    });


    //https://stackoverflow.com/questions/43809120/resizing-a-image-with-javascript-without-rendering-a-canvas-on-the-dom
  }



  private b64toBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
    //https://stackoverflow.com/questions/12168909/blob-from-dataurl
  }

    // scales the canvas by (float) scale < 1
  // returns a new canvas containing the scaled image.
//   downScaleCanvas(cv, scale) {
//       if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
//       var sqScale = scale * scale; // square scale = area of source pixel within target
//       var sw = cv.width; // source image width
//       var sh = cv.height; // source image height
//       var tw = Math.floor(sw * scale); // target image width
//       var th = Math.floor(sh * scale); // target image height
//       var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
//       var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
//       var tX = 0, tY = 0; // rounded tx, ty
//       var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
//       // weight is weight of current source point within target.
//       // next weight is weight of current source point within next target's point.
//       var crossX = false; // does scaled px cross its current px right border ?
//       var crossY = false; // does scaled px cross its current px bottom border ?
//       var sBuffer = cv.getContext('2d').
//       getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
//       var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
//       var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
//       /* untested !
//       var sA = 0;  //source alpha  */    

//       for (sy = 0; sy < sh; sy++) {
//           ty = sy * scale; // y src position within target
//           tY = 0 | ty;     // rounded : target pixel's y
//           yIndex = 3 * tY * tw;  // line index within target array
//           crossY = (tY != (0 | ty + scale)); 
//           if (crossY) { // if pixel is crossing botton target pixel
//               wy = (tY + 1 - ty); // weight of point within target pixel
//               nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
//           }
//           for (sx = 0; sx < sw; sx++, sIndex += 4) {
//               tx = sx * scale; // x src position within target
//               tX = 0 |  tx;    // rounded : target pixel's x
//               tIndex = yIndex + tX * 3; // target pixel index within target array
//               crossX = (tX != (0 | tx + scale));
//               if (crossX) { // if pixel is crossing target pixel's right
//                   wx = (tX + 1 - tx); // weight of point within target pixel
//                   nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
//               }
//               sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
//               sG = sBuffer[sIndex + 1];
//               sB = sBuffer[sIndex + 2];

//               /* !! untested : handling alpha !!
//                 sA = sBuffer[sIndex + 3];
//                 if (!sA) continue;
//                 if (sA != 0xFF) {
//                     sR = (sR * sA) >> 8;  // or use /256 instead ??
//                     sG = (sG * sA) >> 8;
//                     sB = (sB * sA) >> 8;
//                 }
//               */
//               if (!crossX && !crossY) { // pixel does not cross
//                   // just add components weighted by squared scale.
//                   tBuffer[tIndex    ] += sR * sqScale;
//                   tBuffer[tIndex + 1] += sG * sqScale;
//                   tBuffer[tIndex + 2] += sB * sqScale;
//               } else if (crossX && !crossY) { // cross on X only
//                   w = wx * scale;
//                   // add weighted component for current px
//                   tBuffer[tIndex    ] += sR * w;
//                   tBuffer[tIndex + 1] += sG * w;
//                   tBuffer[tIndex + 2] += sB * w;
//                   // add weighted component for next (tX+1) px                
//                   nw = nwx * scale
//                   tBuffer[tIndex + 3] += sR * nw;
//                   tBuffer[tIndex + 4] += sG * nw;
//                   tBuffer[tIndex + 5] += sB * nw;
//               } else if (crossY && !crossX) { // cross on Y only
//                   w = wy * scale;
//                   // add weighted component for current px
//                   tBuffer[tIndex    ] += sR * w;
//                   tBuffer[tIndex + 1] += sG * w;
//                   tBuffer[tIndex + 2] += sB * w;
//                   // add weighted component for next (tY+1) px                
//                   nw = nwy * scale
//                   tBuffer[tIndex + 3 * tw    ] += sR * nw;
//                   tBuffer[tIndex + 3 * tw + 1] += sG * nw;
//                   tBuffer[tIndex + 3 * tw + 2] += sB * nw;
//               } else { // crosses both x and y : four target points involved
//                   // add weighted component for current px
//                   w = wx * wy;
//                   tBuffer[tIndex    ] += sR * w;
//                   tBuffer[tIndex + 1] += sG * w;
//                   tBuffer[tIndex + 2] += sB * w;
//                   // for tX + 1; tY px
//                   nw = nwx * wy;
//                   tBuffer[tIndex + 3] += sR * nw;
//                   tBuffer[tIndex + 4] += sG * nw;
//                   tBuffer[tIndex + 5] += sB * nw;
//                   // for tX ; tY + 1 px
//                   nw = wx * nwy;
//                   tBuffer[tIndex + 3 * tw    ] += sR * nw;
//                   tBuffer[tIndex + 3 * tw + 1] += sG * nw;
//                   tBuffer[tIndex + 3 * tw + 2] += sB * nw;
//                   // for tX + 1 ; tY +1 px
//                   nw = nwx * nwy;
//                   tBuffer[tIndex + 3 * tw + 3] += sR * nw;
//                   tBuffer[tIndex + 3 * tw + 4] += sG * nw;
//                   tBuffer[tIndex + 3 * tw + 5] += sB * nw;
//               }
//           } // end for sx 
//       } // end for sy

//       // create result canvas
//       var resCV = document.createElement('canvas');
//       resCV.width = tw;
//       resCV.height = th;
//       var resCtx = resCV.getContext('2d');
//       var imgRes = resCtx.getImageData(0, 0, tw, th);
//       var tByteBuffer = imgRes.data;
//       // convert float32 array into a UInt8Clamped Array
//       var pxIndex = 0; //  
//       for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
//           tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
//           tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
//           tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
//           tByteBuffer[tIndex + 3] = 255;
//       }
//       // writing result to canvas.
//       resCtx.putImageData(imgRes, 0, 0);
//       return resCV;
//   }
// }




// var imgCV = document.createElement('canvas');
//         imgCV.width = img.width;
//         imgCV.height = img.height;
//         var imgCtx = imgCV.getContext('2d');
//         imgCtx.drawImage(img, 0, 0);


//         if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
//         var sqScale = scale * scale; // square scale = area of source pixel within target
//         var sw = imgCV.width; // source image width
//         var sh = imgCV.height; // source image height
//         var tw = Math.floor(sw * scale); // target image width
//         var th = Math.floor(sh * scale); // target image height
//         var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
//         var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
//         var tX = 0, tY = 0; // rounded tx, ty
//         var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
//         // weight is weight of current source point within target.
//         // next weight is weight of current source point within next target's point.
//         var crossX = false; // does scaled px cross its current px right border ?
//         var crossY = false; // does scaled px cross its current px bottom border ?
//         var sBuffer = imgCV.getContext('2d').
//         getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
//         var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
//         var sR = 0, sG = 0,  sB = 0, sA = 0; // source's current point r,g,b
  
//         for (sy = 0; sy < sh; sy++) {
//             ty = sy * scale; // y src position within target
//             tY = 0 | ty;     // rounded : target pixel's y
//             yIndex = 3 * tY * tw;  // line index within target array
//             crossY = (tY != (0 | ty + scale)); 
//             if (crossY) { // if pixel is crossing botton target pixel
//                 wy = (tY + 1 - ty); // weight of point within target pixel
//                 nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
//             }
//             for (sx = 0; sx < sw; sx++, sIndex += 4) {
//                 tx = sx * scale; // x src position within target
//                 tX = 0 |  tx;    // rounded : target pixel's x
//                 tIndex = yIndex + tX * 3; // target pixel index within target array
//                 crossX = (tX != (0 | tx + scale));
//                 if (crossX) { // if pixel is crossing target pixel's right
//                     wx = (tX + 1 - tx); // weight of point within target pixel
//                     nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
//                 }
//                 sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
//                 sG = sBuffer[sIndex + 1];
//                 sB = sBuffer[sIndex + 2];
//                 sA = sBuffer[sIndex + 3];

//                 // !! untested : handling alpha !!
//                   if (!sA) continue;
//                   if (sA != 0xFF) {
//                       sR = (sR * sA) >> 1;  // or use /256 instead ??
//                       sG = (sG * sA) >> 1;
//                       sB = (sB * sA) >> 1;
//                   }
//                 if (!crossX && !crossY) { // pixel does not cross
//                     // just add components weighted by squared scale.
//                     tBuffer[tIndex    ] += sR * sqScale;
//                     tBuffer[tIndex + 1] += sG * sqScale;
//                     tBuffer[tIndex + 2] += sB * sqScale;
//                 } else if (crossX && !crossY) { // cross on X only
//                     w = wx * scale;
//                     // add weighted component for current px
//                     tBuffer[tIndex    ] += sR * w;
//                     tBuffer[tIndex + 1] += sG * w;
//                     tBuffer[tIndex + 2] += sB * w;
//                     // add weighted component for next (tX+1) px                
//                     nw = nwx * scale
//                     tBuffer[tIndex + 3] += sR * nw;
//                     tBuffer[tIndex + 4] += sG * nw;
//                     tBuffer[tIndex + 5] += sB * nw;
//                 } else if (crossY && !crossX) { // cross on Y only
//                     w = wy * scale;
//                     // add weighted component for current px
//                     tBuffer[tIndex    ] += sR * w;
//                     tBuffer[tIndex + 1] += sG * w;
//                     tBuffer[tIndex + 2] += sB * w;
//                     // add weighted component for next (tY+1) px                
//                     nw = nwy * scale
//                     tBuffer[tIndex + 3 * tw    ] += sR * nw;
//                     tBuffer[tIndex + 3 * tw + 1] += sG * nw;
//                     tBuffer[tIndex + 3 * tw + 2] += sB * nw;
//                 } else { // crosses both x and y : four target points involved
//                     // add weighted component for current px
//                     w = wx * wy;
//                     tBuffer[tIndex    ] += sR * w;
//                     tBuffer[tIndex + 1] += sG * w;
//                     tBuffer[tIndex + 2] += sB * w;
//                     // for tX + 1; tY px
//                     nw = nwx * wy;
//                     tBuffer[tIndex + 3] += sR * nw;
//                     tBuffer[tIndex + 4] += sG * nw;
//                     tBuffer[tIndex + 5] += sB * nw;
//                     // for tX ; tY + 1 px
//                     nw = wx * nwy;
//                     tBuffer[tIndex + 3 * tw    ] += sR * nw;
//                     tBuffer[tIndex + 3 * tw + 1] += sG * nw;
//                     tBuffer[tIndex + 3 * tw + 2] += sB * nw;
//                     // for tX + 1 ; tY +1 px
//                     nw = nwx * nwy;
//                     tBuffer[tIndex + 3 * tw + 3] += sR * nw;
//                     tBuffer[tIndex + 3 * tw + 4] += sG * nw;
//                     tBuffer[tIndex + 3 * tw + 5] += sB * nw;
//                 }
//             } // end for sx 
//         } // end for sy
  
//         // create result canvas
//         var resCV = document.createElement('canvas');
//         resCV.width = tw;
//         resCV.height = th;
//         var resCtx = resCV.getContext('2d');
//         var imgRes = resCtx.getImageData(0, 0, tw, th);
//         var tByteBuffer = imgRes.data;
//         // convert float32 array into a UInt8Clamped Array
//         var pxIndex = 0; //  
//         for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
//             tByteBuffer[tIndex] = Math.ceil(tBuffer[sIndex]);
//             tByteBuffer[tIndex + 1] = Math.ceil(tBuffer[sIndex + 1]);
//             tByteBuffer[tIndex + 2] = Math.ceil(tBuffer[sIndex + 2]);
//             tByteBuffer[tIndex + 3] = 255;
//         }
//         // writing result to canvas.
//         resCtx.putImageData(imgRes, 0, 0);
//         const lol = resCV;
}