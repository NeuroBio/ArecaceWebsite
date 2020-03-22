import { Injectable }                       from '@angular/core';
import { Resolve, Router,
          ActivatedRouteSnapshot }          from '@angular/router';
import { Title }                            from '@angular/platform-browser';

import { Observable, EMPTY}                 from 'rxjs';
import { take, tap}                         from 'rxjs/operators';

import { ComicService }                     from '../comic.service';


@Injectable({
  providedIn: 'root'
})

export class PageResolverService implements Resolve<string> {

  constructor(private comicserv: ComicService,
              private router: Router,
              private titleserv: Title) { }
  
  resolve(route: ActivatedRouteSnapshot):Observable<string | never> {
    const FullID = route.paramMap.get('PageID');
    if(FullID === 'latest') {//no specific page
      this.router.navigate([`comic/${this.comicserv.getLatest()}`]);
      return EMPTY;
    }
    return this.comicserv.getPage(FullID).pipe(
      take(1),
      tap(link => {
        if(link) {//page found
          this.titleserv.setTitle(`Arc 1: ${FullID}`);
          return(link);
        } else {//page not found
          this.router.navigate(['/comic']);
          return EMPTY;
        }
      })
    );  
  }
  
}
