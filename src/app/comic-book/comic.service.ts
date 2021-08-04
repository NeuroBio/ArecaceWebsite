import { Injectable }                     from '@angular/core';

import { BehaviorSubject, Observable,
         Subscription }                   from 'rxjs';
import { map }                            from 'rxjs/operators';

import { ChapterMetaData, CharacterMetaData }                from '../Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class ComicService {

  ChapterData = new BehaviorSubject<ChapterMetaData[]>(new ChapterMetaData()[0]);
  loading = new BehaviorSubject<boolean>(false);
  stream: Subscription;
  
  setloading(load: boolean) {
    this.loading.next(load);
  }

  initializeMetaData(meta: Observable<ChapterMetaData[]>) {
    return this.stream = meta.subscribe(data =>
      this.ChapterData.next(data.sort((a,b) => a.ID < b.ID? -1 : 1)) );
  }

  getMetaData() {
    return this.ChapterData;
  }

  getChap(chapID: number): Observable<ChapterMetaData> {
    return this.getMetaData().pipe(
      map((chaps: ChapterMetaData[]) => chaps.find(chaps => chaps.ID == chapID)) );
  }

  getPage(fullID: string): Observable<string> {
    const ids = fullID.split("-");
    return this.getChap(+ids[0]).pipe(
      map((chap: any) => {
        if(chap) {
          return chap.Links[+ids[1]-1];
        } else {
          return undefined;
        }
      })
    );
  }

  getLatest(): string {
    const chaps = this.ChapterData.value;
    const lastchapindex = chaps.length-1;
    return `${chaps[lastchapindex].ID}-${chaps[lastchapindex].Links.length}`;
  }

  disposal() {
    if(this.stream) {
      this.stream.unsubscribe();
    }
  }
}