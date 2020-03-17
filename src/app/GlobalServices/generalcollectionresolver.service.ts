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
    let type:string;
    const url = route['_routerState'].url.split('/');

    if(route.url[0]){//for characters, also catches more common cases
      type = route.url[route.url.length-1].path;
    } else if (route.firstChild) {//this and else catch lazyloaded module weirdness
      type = url[url.length-2];
    } else {
      type = url[url.length-1];
    }


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
}
