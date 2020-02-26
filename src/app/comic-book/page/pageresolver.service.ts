import { Injectable }                       from '@angular/core';
import { Resolve, Router,
          ActivatedRouteSnapshot }          from '@angular/router';

import { Observable, EMPTY}                 from 'rxjs';
import { take, tap}                         from 'rxjs/operators';

import { ComicService }                     from '../comic.service';


@Injectable({
  providedIn: 'root'
})

export class PageResolverService implements Resolve<string> {

  constructor(private comicserv: ComicService,
              private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot):Observable<string | never> {
    const FullID = route.paramMap.get('PageID');
    return this.comicserv.getPage(FullID).pipe(
      take(1),
      tap(link => {
        if(link) {//page found
          return(link);
        } else {//page not found
          this.router.navigate(['/comic']);
          return EMPTY;
        }
      })
    );
  }
  
}
