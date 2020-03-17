import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DownloadPageService } from './download-page.service';
import { CacheService } from 'src/app/GlobalServices/cache.service';
import { AllPathInfo } from 'src/app/Classes/UploadDownloadPaths';
import { take, tap } from 'rxjs/operators';
import { CharacterMetaData } from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class DownloadResolverService implements Resolve<any>{
  
  firePaths = new AllPathInfo();

  constructor(private cache: CacheService,
              private router: Router,
              private downloadserv: DownloadPageService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const P = this.assignParams(route);

    if(this.cache.Cache[P.Type]) {
      return this.cache.Cache[P.Type].pipe(take(1),
        tap((data: any[]) => {
          return this.findIndex(data, P);
        }));
    } else {
      return this.cache.addSubscription(P.Type, this.firePaths[P.Type].Fire)
      .then(() => {
        if(this.cache.Cache[P.Type].value[0]) {
          this.findIndex(this.cache.Cache[P.Type].value, P);
        } else {
          delete this.cache.Cache[P.Type];
          return this.router.navigate(['badservice']);
        }
      });
    }
  }

  assignParams(route: ActivatedRouteSnapshot) {
    const url = route['_routerState'].url.split('/');
    let type: string;
    let ID: string;
    let refName: string;
    if(this.firePaths[url[url.length-3]]) {
    type = url[url.length-3];
    ID = url[url.length-2];
    } else {
      type = url[url.length-4];
      ID = url[url.length-3];
      refName = url[url.length-2];
    }
    return {Url: url, Type: type, ID: ID, RefName: refName}
  }

  findIndex(data: any[], P: any) {
    const index = data.findIndex(datum => datum.ID === P.ID);
    if(index > -1) { //data exists
      if(P.RefName) { //subref
        const refIndex = this.findRef(this.cache.Cache[P.Type].value[index], P.RefName)
        if(refIndex > -1) { //subref exists
          return this.downloadserv.fetchImageData(index, P.Type, refIndex);
        }
      } else { //normal aka: no subref
        return this.downloadserv.fetchImageData(index, P.Type, undefined);
      }
    }
    P.Url.pop();
    return this.router.navigate([`${P.Url.join('/')}`]);
  }

  findRef(char: CharacterMetaData, ID: string) {
    return char.References.findIndex(ref => ref.ID === ID);
  }
}
