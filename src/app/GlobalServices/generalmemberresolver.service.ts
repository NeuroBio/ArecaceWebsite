import { Injectable } from '@angular/core';
import { GeneralcollectionService } from './generalcollection.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { GetRouteSegmentsService } from './commonfunctions.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralmemberresolverService implements Resolve<any>{

  constructor(private generalcollectserv: GeneralcollectionService,
              private router: Router,
              private getrouteserv: GetRouteSegmentsService) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    const ID = this.checkLatest(route.url[0].path);
    return this.generalcollectserv.getMember(ID).pipe(
      take(1),
      tap(member => {
        if(member){
          return of (member);
        }else{
          this.router.navigate([`${this.getrouteserv.fetch(route.pathFromRoot)}/notfound`]);
          return of (EMPTY);
        }
      })
    )
  }

  checkLatest(ID: string) {
    if(ID === 'Latest') {
      ID = this.generalcollectserv.collectionData.value
      .sort((a,b) => a.Created > b.Created ? -1 : 1)[0].ID
    }
    return ID;
  }
}
