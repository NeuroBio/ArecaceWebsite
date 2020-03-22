import { Injectable }                               from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';
import { Title }                                    from '@angular/platform-browser';

import { DisplayService }                           from '../display.service';

import { AllUserDataInfo }                          from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})

export class UserdataDetailsResolverService implements Resolve<any> {

  UserDataInfo = new AllUserDataInfo();

  constructor(private displayserv: DisplayService,
              private router: Router,
              private titleserv: Title) { }

  resolve(route: ActivatedRouteSnapshot) {
    const path =  route['_routerState'].url.split('/');
    const ID = path[path.length-1].split('\?')[0]; //remove query params
    const Type = path[path.length-2]

    if(this.displayserv.updateCurrentUserDatum(ID) === true) {
      this.titleserv.setTitle(`${this.UserDataInfo[Type].ShortName}: ${ID}`)
      return this.displayserv.currentUserDatum.value;
    } else {
      this.router.navigate([`/dash/${path[path.length-2]}`])
    }
  }
}
