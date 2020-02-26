import { Injectable }         from '@angular/core';
import { Resolve }            from '@angular/router';

import { Observable }         from 'rxjs';
import { take }               from 'rxjs/operators';

import { ComicService }       from '../comic.service';


@Injectable({
  providedIn: 'root'
})
export class LatestResolverService implements Resolve<string> {

  constructor(private comicserv: ComicService) { }
  
  resolve(): Observable<string> {
    return this.comicserv.getLatest().pipe(take(1));
  }
}