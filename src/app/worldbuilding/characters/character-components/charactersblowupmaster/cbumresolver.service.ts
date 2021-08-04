import { Injectable } from '@angular/core';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { take, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';

@Injectable({
  providedIn: 'root'
})
export class CBUMResolverService implements Resolve<any> {

  constructor(
    private generalcollectserv: GeneralcollectionService,
    private router: Router,
    private getrouteserv: GetRouteSegmentsService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const ID = route.parent.paramMap.get('CharaID');
    const Ref = route.paramMap.get('RefID');

    return this.generalcollectserv.getMember(ID).pipe(
      take(1),
      mergeMap(chara => {
        const reference = this.getRef(chara, Ref);
        if (reference) {
          return of (reference);
        } else {
          this.router.navigate([this.getrouteserv.fetch(route.pathFromRoot).join('/')]);
          return of (EMPTY);
        }
      })
    );
  }

  getRef(character: any, ID: string) {
    return character.References.find(ref => ref.ID === ID);
  }

}
