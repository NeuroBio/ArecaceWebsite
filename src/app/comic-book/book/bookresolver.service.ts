import { Injectable }             from '@angular/core';
import { Resolve, Router }        from '@angular/router';

import { ComicService }           from '../comic.service';
import { CacheService }           from 'src/app/GlobalServices/cache.service';

@Injectable({
  providedIn: 'root'
})

export class BookResolverService implements Resolve<any> {

  constructor(private router: Router,
              private cache: CacheService, 
              private comicserv: ComicService) { }

  resolve() {
    if(this.cache.Cache['Arc1']) {
      return this.comicserv.initializeMetaData(this.cache.Cache['Arc1']);
    } else {
      return this.cache.addSubscription('Arc1', 'Arc1Data')
      .then(() =>{
        if(this.cache.Cache['Arc1'].value[0]) {
          return this.comicserv.initializeMetaData(this.cache.Cache['Arc1']);
        } else {
          delete this.cache.Cache['Arc1'];
          this.router.navigate(['/badservice']);
        }
      });
    }
  }
  
}
