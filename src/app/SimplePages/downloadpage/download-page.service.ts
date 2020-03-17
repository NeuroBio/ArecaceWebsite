import { Injectable } from '@angular/core';
import { CacheService } from 'src/app/GlobalServices/cache.service';
import { BehaviorSubject } from 'rxjs';
import { CharacterMetaData } from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})
export class DownloadPageService {

  ImageData = new BehaviorSubject<any>(undefined);

  constructor(private cache: CacheService) { }

  fetchImageData(index: number, type: string, refIndex: number) {
    return this.cache.Cache[type].subscribe((data: any[]) => {
      if(refIndex !== undefined) {
        this.ImageData.next(this.makeRefData(data[index], refIndex)); 
      } else {
        this.ImageData.next(data[index]);
      }
    });
  }

  makeRefData(char: CharacterMetaData, index: number) {
    let ref: any;
    ref = char.References[index];
    ref.Links = [char.Links[(index+1)*2], char.Links[(index+1)*2+1]];
    return ref;
  }
}
