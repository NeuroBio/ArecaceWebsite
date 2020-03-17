import { Injectable } from '@angular/core';
import { CacheService } from 'src/app/GlobalServices/cache.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadPageService {

  ImageData = new BehaviorSubject<any>(undefined);

  constructor(private cache: CacheService) { }

  fetchImageData(ID: string, type: string){
    console.log("tryin")
    return this.cache.Cache[type].subscribe((data: any[]) =>
      this.ImageData.next(data.find(datum => datum.ID === ID)) );
  }
}
