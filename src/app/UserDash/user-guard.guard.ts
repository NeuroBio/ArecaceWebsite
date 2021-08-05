import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import {AuthService} from 'src/app/administration/security/Auth/auth.service';
import { User } from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class UserGuardGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const url: string = state.url;
    return this.checkUser(url);
  }

  checkUser(url: string): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map((user: User) => {
        if (user) {
            if (user.User) { return true; }
        }
        this.auth.redirectUrl = url;
        this.router.navigate(['/dash']);
        return false;
      })
    );
  }

}
