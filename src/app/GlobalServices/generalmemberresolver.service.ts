import { Injectable }                               from '@angular/core';
import { Title }                                    from '@angular/platform-browser';
import { Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';

import { take, tap }                                from 'rxjs/operators';
import { of, EMPTY }                                from 'rxjs';

import { GeneralcollectionService }                 from './generalcollection.service';
import { GetRouteSegmentsService }                  from './commonfunctions.service';

import { AllPathInfo }                              from '../Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})
export class GeneralmemberresolverService implements Resolve<any>{

  AllPaths = new AllPathInfo();

  constructor(private generalcollectserv: GeneralcollectionService,
              private router: Router,
              private getrouteserv: GetRouteSegmentsService,
              private titleserv: Title) { }
  
  resolve(route: ActivatedRouteSnapshot) {
    const ID = route.url[0].path;
    if(this.checkLatest(ID, route) === false) {
      return;
    }

    return this.generalcollectserv.getMember(ID).pipe(
      take(1),
      tap(member => {
        if(member){
          this.setTitle(member);
          return of (member);
        }else{
          this.router.navigate([`${this.getrouteserv.fetch(route.pathFromRoot).join('/')}/notfound`]);
          return of (EMPTY);
        }
      })
    )
  }

  checkLatest(ID: string, route: any) {
    if(ID === 'Latest') {
      ID = this.generalcollectserv.collectionData.value
      .sort((a,b) => a.Created > b.Created ? -1 : 1)[0].ID;
      const url = route['_routerState'].url.split('/');
      url.pop();
      url.push(ID);
      this.router.navigate([url.join('/')]);
      return false;
    }
    return true;
  }

  setTitle(member: any) {
    const ID = this.makeName(member, this.generalcollectserv.type.value);
    const Location = this.generalcollectserv.type.value.split('');
    Location[0] = Location[0].toLocaleUpperCase();
    this.titleserv.setTitle(`${Location.join('')}: ${ID}`);
  }

  makeName(member: any, location: string) {
    const Name = [];
    this.AllPaths[location].NameTokens.forEach(token =>
      Name.push(member[token]));
    return Name.join(' ');
  }
}
