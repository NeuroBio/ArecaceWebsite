import { Injectable }                       from '@angular/core';

import { BehaviorSubject, Observable, of }  from 'rxjs';
import { map, tap }                         from 'rxjs/operators';

import { StoryMetaData }                    from 'src/app/Classes/storymetadata'

@Injectable({
  providedIn: 'root'
})

export class StoryService {

  series = new BehaviorSubject<any[]>([])
  seriesTitles = new BehaviorSubject<StoryMetaData[]>(new StoryMetaData()[0])
  script = new BehaviorSubject<boolean>(true);
  currentSeries = new BehaviorSubject<string>('');
  currentSection = new BehaviorSubject<string>('');
  loading = new BehaviorSubject<boolean>(true);

  constructor() { }

  initializeMetaData(metaData: StoryMetaData[]): void{
    return this.series.next(metaData);
  }

  initializeSeriesData(serieData: StoryMetaData[]){
    this.getStory(serieData[0].ID);
    return this.seriesTitles.next(serieData);
  }

  getMetaData(){
    return this.series;
  }
  getSeriesData(){
    return this.seriesTitles;
  }

  getStory(storyID:string): Observable<StoryMetaData>{
    return this.getSeriesData().pipe(
      map(stories => stories.find(stories =>
        stories.ID === storyID))
    )
  }

  getType(){
    return this.script
  }

  getCurrent(): Observable<any[]>{
    return of ([this.currentSeries,
                this.currentSection,
                this.script])
  }
  
  changeType(type: boolean){
    this.script.next(type);
  }

  changeSection(newSec: string){
    this.currentSection.next(newSec);
  }

  changeSeries(newSec: string){
    this.currentSeries.next(newSec);
    this.getSeriesData().pipe(
      tap(serie =>
      this.changeSection(serie[0].ID)
      )
    )
  }

  updateLoading(change: boolean){
    this.loading.next(change);
  }
}
