import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


import { GeneralcollectionService } from './generalcollection.service';
import { CacheService } from './cache.service';

import { AllPathInfo } from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})

export class GeneralcollectionresolverService implements Resolve<any> {

  firePaths = new AllPathInfo;

  constructor(
    private generalcollectionserv: GeneralcollectionService,
    private cache: CacheService,
    private titleserv: Title,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const url = route['_routerState'].url.split('/');
    const type = url[this.backstep(url)];

    if (this.cache.Cache[type]) {
      this.setTitle(type);
      return this.generalcollectionserv.initializeMetaData(this.cache.Cache[type], type);
    } else {
      return this.cache.addSubscription(type, this.firePaths[type].Fire)
      .then(() => {
          if (this.cache.Cache[type].value[0]) {
            this.setTitle(type);
            return this.generalcollectionserv.initializeMetaData(this.cache.Cache[type], type);
          } else {
            delete this.cache.Cache[type];
            this.router.navigate(['badservice']);
          }
      });
    }
  }

  backstep(url: string[]) {
    for (let i = url.length - 1; i > 0; i--) {
      if (this.firePaths[url[i]]) {
        return i;
      }
    }
  }

  setTitle(type: string) {
    const Location = type.split('');
    Location[0] = Location[0].toLocaleUpperCase();
    this.titleserv.setTitle(`${Location.join('')}`);
  }
}
