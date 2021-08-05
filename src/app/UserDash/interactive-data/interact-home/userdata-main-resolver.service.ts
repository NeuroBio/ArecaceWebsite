import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { take, tap } from 'rxjs/operators';

import { AuthService } from '../../../administration/security/Auth/auth.service';
import { DisplayService } from '../display.service';

import { AllUserDataInfo } from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})

export class UserdataMainResolverService implements Resolve<any> {

  UserDataInfo = new AllUserDataInfo;

  constructor(
    private auth: AuthService,
    private router: Router,
    private displayserv: DisplayService,
    private titleserv: Title
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const path =  route['_routerState'].url.split('/');
    let type: string;

    if (route.firstChild) {
      type = path[path.length - 2];
    } else {
      type = path[path.length - 1];
    }
    type = type.split('\?')[0]; // remove query params

    return this.auth.user.pipe(
      take(1),
      tap(user => {
        if (user[type]) {
          if (user[type][0]) {
            this.titleserv.setTitle(this.UserDataInfo[type].ShortName);
            return this.displayserv.assignData(type);
          }
        }
        this.router.navigate(['/dash']);
    }) );
  }
}
