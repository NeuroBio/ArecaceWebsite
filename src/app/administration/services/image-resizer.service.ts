import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageResizerService {

  constructor() { }

  resizeImage(file: any, maxwidth: number, maxheight: number, Blob: boolean) {
    return this.resizer(file, maxwidth, maxheight)
    .then(urlString => {
        if(Blob) {
            return this.b64toBlob(urlString);
        } else {
            return urlString;
        }
    });
  }

  private resizer(file: any, maxW: number, maxH: number) {
    return new Promise((resolve) => {
      //var canvas = document.createElement('canvas');
      // var context = canvas.getContext('2d');

      const canvas = document.createElement('canvas');
      const ctx1 = canvas.getContext('2d');

      const img = document.createElement('img');
      let URLi;

      img.onload = function() {    
        setTimeout(() => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx1.drawImage(img, 0, 0);
          const scale = Math.min((maxW / img.width), (maxH / img.height));
          const iwScaled = img.width * scale;
          const ihScaled = img.height * scale;

          console.log('part 1')
          const width_source = canvas.width;
          const height_source = canvas.height;
          const width = Math.round(iwScaled);
          const height = Math.round(ihScaled);

          const ratio_w = width_source / width;
          const ratio_h = height_source / height;
          const ratio_w_half = Math.ceil(ratio_w / 2);
          const ratio_h_half = Math.ceil(ratio_h / 2);

          const ctx = canvas.getContext("2d");
          const imgold = ctx.getImageData(0, 0, width_source, height_source);
          const img2 = ctx.createImageData(width, height);
          const data = imgold.data;
          const data2 = img2.data;
          console.log('part 2')

          for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
              let x2 = (i + j * width) * 4;
                let weight = 0;
                let weights = 0;
                let weights_alpha = 0;
                let gx_r = 0;
                let gx_g = 0;
                let gx_b = 0;
                let gx_a = 0;
                let center_y = (j + 0.5) * ratio_h;
                let yy_start = Math.floor(j * ratio_h);
                let yy_stop = Math.ceil((j + 1) * ratio_h);
                for (let yy = yy_start; yy < yy_stop; yy++) {
                    const dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
                    const center_x = (i + 0.5) * ratio_w;
                    const w0 = dy * dy; //pre-calc part of w
                    const xx_start = Math.floor(i * ratio_w);
                    const xx_stop = Math.ceil((i + 1) * ratio_w);
                    for (let xx = xx_start; xx < xx_stop; xx++) {
                        const dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
                        const w = Math.sqrt(w0 + dx * dx);
                        if (w >= 1) {
                            //pixel too far
                            continue;
                        }
                        //hermite filter
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        const pos_x = 4 * (xx + yy * width_source);
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
            canvas.width = width;
            canvas.height = height;

            //draw
            ctx.putImageData(img2, 0, 0);
            //https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality
            URLi = canvas.toDataURL();        
            return resolve(URLi)
        }, 10);
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