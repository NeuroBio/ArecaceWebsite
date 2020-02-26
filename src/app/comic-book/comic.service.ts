import { Injectable }                     from '@angular/core';

import { BehaviorSubject, Observable }    from 'rxjs';
import { map }                            from 'rxjs/operators';

import { ChapterMetaData }                from '../Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class ComicService {

  ChapterData = new BehaviorSubject<ChapterMetaData[]>(new ChapterMetaData()[0]);
  loadingSource = new BehaviorSubject<boolean>(false);
  loading: Observable<boolean> = this.loadingSource;

  
  loadingComplete(){
    this.loadingSource.next(false);
  }

  initializeMetaData(meta: ChapterMetaData[]){
    this.ChapterData.next(meta);
  }

  getMetaData(){
    return this.ChapterData;
  }

  getChap(chapID: number): Observable<ChapterMetaData>{
    return this.getMetaData().pipe(
      map(chaps =>
        chaps.find(chaps =>
          chaps.ID == chapID))
    );
  }

  getPage(fullID: string): Observable<string>{
    const ids = fullID.split("-")
    return this.getChap(+ids[0]).pipe(
      map(chap => {
        if(chap) {
          return chap.Links[+ids[1]-1];
        } else {
          return;
        }
      })
    );
  }

  getLatest(): Observable<string>{
    return this.getMetaData().pipe(
      map(meta =>
        meta[meta.length-1].Links[meta[meta.length-1].Links.length-1]
      )
    );
  }

}