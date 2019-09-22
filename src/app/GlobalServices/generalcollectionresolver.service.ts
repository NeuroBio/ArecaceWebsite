import { Injectable } from '@angular/core';
import { FireBaseService } from './firebase.service';
import { GeneralcollectionService } from './generalcollection.service';
import { FirebasePaths } from 'src/app/Classes/FirebasePaths';
import { take, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralcollectionresolverService implements Resolve<any>{
  
  firePaths = new FirebasePaths;

  constructor(private firebaseserv: FireBaseService,
              private generalcollectionserv: GeneralcollectionService,
              private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot){
    const type = route.url[route.url.length-1].path
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
