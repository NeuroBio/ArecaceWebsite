import { Injectable } from '@angular/core';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { Router, Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { take, tap, map, mergeMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CBUMResolverService implements Resolve<any>{

  constructor(private generalcollectserv: GeneralcollectionService,
              private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot){
    const ID = route.parent.paramMap.get('CharaID');
    const Ref = route.paramMap.get('RefID');

    return this.generalcollectserv.getMember(ID).pipe(
      take(1),
      mergeMap(chara =>{
        const reference = this.getRef(chara, Ref)
        if(reference){
          return of (reference);
        }else{
          this.router.navigate([`${route.pathFromRoot[1].url.join('/')}/notfound`]);
          return of (EMPTY);
        }
      })
    )
  }

  getRef(character: any, ID: string){
    return character.References.find(ref => ref.ID === ID)
  }

}
