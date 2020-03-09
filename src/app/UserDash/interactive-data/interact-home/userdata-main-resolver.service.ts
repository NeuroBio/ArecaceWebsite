import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../administration/security/Auth/auth.service';
import { take, tap } from 'rxjs/operators';
import { DisplayService } from '../display.service';

@Injectable({
  providedIn: 'root'
})

export class UserdataMainResolverService implements Resolve<any> {

  constructor(private auth: AuthService,
              private router: Router,
              private displayserv: DisplayService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const path =  route['_routerState'].url.split('/');
    let type;

    if(route.firstChild) {
      type = path[path.length-2];
    } else {
      type = path[path.length-1];
    }
    type = type.split('\?')[0]; //remove query params

    return this.auth.user.pipe(
      take(1),
      tap(user => {
        if(user[type]){
          if(user[type][0]) {
            return this.displayserv.assignData(type);
          }
        }
        this.router.navigate(['/dash'])
    }) );
  }
}
