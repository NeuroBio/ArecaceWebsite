import { Injectable }             from '@angular/core';
import { Resolve }                from '@angular/router';

import { map, take }              from 'rxjs/operators';

import { ChapterMetaData }        from '../../Classes/ContentClasses';
import { ComicService }           from '../comic.service';
import { FireBaseService }        from 'src/app/GlobalServices/firebase.service';
import { CacheService } from 'src/app/GlobalServices/cache.service';

@Injectable({
  providedIn: 'root'
})

export class BookResolverService implements Resolve<any> {

  constructor(private firebaseserv: FireBaseService,
              private cache: CacheService, 
              private comicserv: ComicService) { }

  resolve() {
    if(this.cache.Cache['Arc1Data']) {
      return this.comicserv.initializeMetaData(this.cache.Cache['Arc1Data']);
    } else {
      
      this.cache.addSubscription('Arc1Data', this.firebaseserv.returnCollect('Arc1Data')
        .pipe( map((metaData:ChapterMetaData[]) => 
          metaData.sort((a,b) => a.ID < b.ID ? -1 :1))
      ));
      return this.firebaseserv.returnCollect('Arc1Data').pipe(
        take(1),
        map((metaData:ChapterMetaData[]) => {
          metaData.sort((a,b) => a.ID < b.ID ? -1 :1);
          this.comicserv.initializeMetaData(metaData);
      }) );
    }
  }
  
}
