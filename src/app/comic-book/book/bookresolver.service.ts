import { Injectable }             from '@angular/core';
import { Resolve }                from '@angular/router';

import { map, take }              from 'rxjs/operators';

import { ChapterMetaData }        from '../../Classes/ContentClasses';
import { ComicService }           from '../comic.service';
import { FireBaseService }        from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class BookResolverService implements Resolve<any> {

  constructor(private firebaseserv: FireBaseService,
              private comicserv: ComicService) { }

  resolve(){
    return this.firebaseserv.returnCollect('Arc1Data').pipe(
      take(1),
      map((metaData:ChapterMetaData[]) => {
        metaData.sort((a,b) => a.ID < b.ID ? -1 :1);
        this.comicserv.initializeMetaData(metaData)
      })
    );
  }
  
}
