import { Injectable }                 from '@angular/core';
import { ActivatedRouteSnapshot,
         Resolve, Router }            from '@angular/router';

import { GeneralcollectionService }   from './generalcollection.service';
import { CacheService }               from './cache.service';

import { AllPathInfo }              from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})

export class GeneralcollectionresolverService implements Resolve<any> {
  
  firePaths = new AllPathInfo;

  constructor(private generalcollectionserv: GeneralcollectionService,
              private cache: CacheService,
              private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    const url = route['_routerState'].url.split('/');
    const type = url[this.backstep(url)];

    if(this.cache.Cache[type]){
      return this.generalcollectionserv.initializeMetaData(this.cache.Cache[type], type);
      
    } else {
      return this.cache.addSubscription(type, this.firePaths[type].Fire)
      .then(() => {
          if(this.cache.Cache[type].value[0]) {
            this.generalcollectionserv.initializeMetaData(this.cache.Cache[type], type);
          } else {
            delete this.cache.Cache[type];
            this.router.navigate(["badservice"]);
          }
      });
    }
  }

  backstep(url: string[]) {
    for(let i = url.length -1; i > 0; i--) {
      if(this.firePaths[url[i]]) {
        return i;
      }
    }
  }
}
