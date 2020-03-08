import { Injectable }                 from '@angular/core';
import { ActivatedRouteSnapshot,
         Resolve, Router }            from '@angular/router';

import { take, tap }                  from 'rxjs/operators';

import { FireBaseService }            from './firebase.service';
import { GeneralcollectionService }   from './generalcollection.service';
import { CacheService }               from './cache.service';

import { FirebasePaths }              from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})

export class GeneralcollectionresolverService implements Resolve<any> {
  
  firePaths = new FirebasePaths;

  constructor(private firebaseserv: FireBaseService,
              private generalcollectionserv: GeneralcollectionService,
              private cache: CacheService,
              private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    let type:string;
    const url = route['_routerState'].url.split('/');
    if(route.url[0]){
      //for characters, also catches more common cases
      type = route.url[route.url.length-1].path;
    } else if (route.firstChild) {
      //this and else catch lazyloaded module weirdness
      type = url[url.length-2];
    } else {
      type = url[url.length-1];
    }
    if(this.cache.Cache[type]){
      return this.generalcollectionserv.initializeMetaData(this.cache.Cache[type], type);
      
    } else {
      this.cache.addSubscription(type, this.firebaseserv.returnCollect(this.firePaths[type]))
      return this.firebaseserv.returnCollect(this.firePaths[type]).pipe(
        take(1),
        tap(collect => {
          if(collect[0]) {
            this.generalcollectionserv.initializeMetaData(collect, type);
          }else{
            this.router.navigate(["badservice"])
          }
      }));
    }
  }
}
