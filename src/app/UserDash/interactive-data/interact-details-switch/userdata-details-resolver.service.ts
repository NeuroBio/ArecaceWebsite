import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DisplayService } from '../display.service';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserdataDetailsResolverService implements Resolve<any> {

  constructor(private displayserv: DisplayService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) {
    const path =  route['_routerState'].url.split('/');
    const ID = path[path.length-1].split('\?')[0]; //remove query params

    if(this.displayserv.updateCurrentUserDatum(ID) === true) {
      return this.displayserv.currentUserDatum.value;
    } else {
      this.router.navigate([`/dash/${path[path.length-2]}`])
    }
  }
}
