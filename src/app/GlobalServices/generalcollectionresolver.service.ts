import { Injectable } from '@angular/core';
import { FireBaseService } from './firebase.service';
import { GeneralcollectionService } from './generalcollection.service';
import { FirebasePaths } from 'src/app/Classes/UploadDownloadPaths';
import { take, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GeneralcollectionresolverService implements Resolve<any> {
  
  firePaths = new FirebasePaths;

  constructor(private firebaseserv: FireBaseService,
              private generalcollectionserv: GeneralcollectionService,
              private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot){
    let type:string;
    const url = route['_routerState'].url.split('/');
    if(route.url[0]){
      type = route.url[route.url.length-1].path;
    } else if (url[url.length-2]){
      type = url[url.length-2];
    } else {
      type = url[url.length-1];
    }
    return this.firebaseserv.returnCollect(this.firePaths[type]).pipe(
      take(1),
      tap(collect =>{
        if(collect[0]){
          this.generalcollectionserv.initializeMetaData(collect);
        }else{
          this.router.navigate(["badservice"])
        }
    }))
  }
}
