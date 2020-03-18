import { Injectable }         from '@angular/core';

import { Subject, BehaviorSubject }            from 'rxjs';

import { ImageSettings }      from './uploadpreviewclass';

@Injectable({
  providedIn: 'root'
})

export class UploadPreviewService {

  thumbsData = [];
  mainsData = [];
  allowed = ['image/png', 'image/jpeg', 'image/gif'];
  reset = new Subject();
  oldLinks = new BehaviorSubject<string[]>([]);
  constructor() { }

  assignThumb(index:number, data: any) {
    this.thumbsData[index] = data;
  }
  
  assignMain(index:number, data: any) {
    this.mainsData[index] = data;
  }

  assignOldLinks(links: string[]) {
    this.oldLinks.next(links);
  }

  clear() {
    this.thumbsData = [];
    this.mainsData = [];
    this.oldLinks.next([]);
  }
  
  add() {
    this.thumbsData.push(undefined);
    this.mainsData.push(undefined);
  }

  remove(index:number) {
    this.thumbsData.splice(index,1);
    this.mainsData.splice(index,1);
  }

  erase(index:number) {
    this.thumbsData[index] = undefined;
    this.mainsData[index] = undefined;
  }

  checkFile(event: any, settings: ImageSettings) {
    return new Promise((resolve, reject) => {
      const found = this.allowed.findIndex(x => x === event.target.files[0].type)
      if(found === -1) {
        return reject([false, `Image must be of type jpeg, gif, or png.`]);
      }
      return this.getFileInfo(event)
      .then(info => {

        if(settings.MaxHeight)
          if(info[0] > settings.MaxHeight)
            return reject([false, `Image height cannot be greater than ${settings.MaxHeight} pixels.`]);

        if(settings.MaxWidth)
          if(info[1] > settings.MaxWidth)
            return reject([false, `Image width cannot be greater than ${settings.MaxWidth} pixels.`]);

        if(settings.MaxSize)
          if(info[2] > settings.MaxSize)
            return reject([false, `Image size cannot be greater than ${settings.MaxSize} kb.`]); 

        return resolve(true);
      });
    })
  }

  getFileInfo(event: any) {
    return new Promise((resolve: any) => {
      const File = event.target.files[0];
      const Size = File.size;
      let Width: number;
      let Height: number
      const reader = new FileReader();

      reader.onload = function() {
        const img = new Image;
        
        img.onload = function() {
          Width = img.width;
          Height = img.height;
          return resolve([Height, Width, Size])
        }
        return img.src = reader.result.toString();
      }
      return reader.readAsDataURL(File);
    });
  }

  quickFiletob64(event: any) {
    return new Promise((resolve: any) => {
      const File = event.target.files[0]
      let reader = new FileReader();
      reader.onload = function () {
        return resolve(reader.result);
      };
      return reader.readAsDataURL(File);
    });
  }

}
