import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';
import { DownloadPageService } from './download-page.service';
import { CacheService } from 'src/app/GlobalServices/cache.service';
import { AllPathInfo } from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})

export class DownloadResolverService implements Resolve<any>{
  
  firePaths = new AllPathInfo();

  constructor(private getsegserv: GetRouteSegmentsService,
              private cache: CacheService,
              private router: Router,
              private downloadserv: DownloadPageService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const path = this.getsegserv
      .fetch(route.pathFromRoot);
    const ID = path[path.length-2];
    const type = path[path.length-3];
    console.log(path)
    console.log(ID)
    console.log(type)
    if(this.cache.Cache[type]){
      return this.downloadserv.fetchImageData(ID, type);
      
    } else {
      return this.cache.addSubscription(type, this.firePaths[type].Fire)
      .then(() => {
          if(this.cache.Cache[type].value[0]) {
            this.downloadserv.fetchImageData(ID, type);
          } else {
            delete this.cache.Cache[type];
            this.router.navigate(["badservice"]);
          }
      });
    }
  }
}
