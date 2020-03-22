import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { DownloadPageService } from './download-page.service';
import { CacheService } from 'src/app/GlobalServices/cache.service';
import { AllPathInfo, AllUserDataInfo } from 'src/app/Classes/UploadDownloadPaths';
import { take, tap } from 'rxjs/operators';
import { CharacterMetaData } from 'src/app/Classes/ContentClasses';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DownloadResolverService implements Resolve<any>{
  
  firePaths = new AllPathInfo();
  userTokens = new AllUserDataInfo();

  constructor(private cache: CacheService,
              private router: Router,
              private downloadserv: DownloadPageService,
              private auth: AuthService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const P = this.assignParams(route);
    if(this.firePaths[P.Type]) { //my data
      return this.standardPath(P);
    } else { //user data
      return this.auth.user.pipe(take(1)).subscribe(user => {
        if(user[P.Type]) {
          return this.findIndex(user[P.Type], P, true);
        }
        this.backUp(P.Url);
      });
    }

  }

  assignParams(route: ActivatedRouteSnapshot) {
    const url = route['_routerState'].url.split('/');
    let type: string;
    let ID: string;
    let refName: string;
    //check whether second to last seg is the type (ref); otherwise assume it is the third (subref)
    if(this.firePaths[url[url.length-3]] || this.userTokens[url[url.length-3]].NameTokens) {
      type = url[url.length-3];
      ID = url[url.length-2];
    } else {
      type = url[url.length-4];
      ID = url[url.length-3];
      refName = url[url.length-2];
    }
    return {Url: url, Type: type, ID: ID, RefName: refName};
  }

  backUp(url: string[]) {
    url.pop();
    return this.router.navigate([`${url.join('/')}`]);
  }

  findIndex(data: any[], P: any, user?: boolean) {
    const index = data.findIndex(datum => datum.ID === P.ID);
    if(index > -1) { //data exists
      if(P.RefName) { //subref
        const refIndex = this.findRef(data[index], P.RefName)
        if(refIndex > -1) { //subref exists
          return this.downloadserv.fetchImageData(index, P.Type, refIndex, user);
        }
      } else { //normal aka: no subref
        return this.downloadserv.fetchImageData(index, P.Type, undefined, user);
      }
    }
    this.backUp(P.Url);
  }

  findRef(char: CharacterMetaData, ID: string) {
    return char.References.findIndex(ref => ref.ID === ID);
  }

  standardPath(P: any) {
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
}
