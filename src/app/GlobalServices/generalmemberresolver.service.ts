import { Injectable } from '@angular/core';
import { GeneralcollectionService } from './generalcollection.service';
import { Router, Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralmemberresolverService implements Resolve<any>{

  constructor(private generalcollectserv: GeneralcollectionService,
              private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot){
    const ID = route.url[0].path;
    return this.generalcollectserv.getMember(ID).pipe(
      take(1),
      tap(member => {
        if(member){
          return of (member);
        }else{
          this.router.navigate([`${route.pathFromRoot[1].url.join('/')}/notfound`]);
          return of (EMPTY);
        }
      })
    )
  }
}
