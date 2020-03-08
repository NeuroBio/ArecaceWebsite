import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadPageService {

  imgUrl: string;
  
  constructor() { }

  assignImgUrl(url: string) {
    this.imgUrl = url;
  }
}
