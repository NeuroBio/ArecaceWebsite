import { Injectable }                       from '@angular/core';

import { BehaviorSubject, Observable, of,
Subscription }                              from 'rxjs';
import { map, tap }                         from 'rxjs/operators';

import { StoryMetaData }                    from 'src/app/Classes/ContentClasses'

@Injectable({
  providedIn: 'root'
})

export class StoryService {

  /*Notes: Data is pulled down as all stories from resolver one.
  serializer storts that information into a dictionary and makes
  a converto between the ID (no spaces; used in route segments) and
  the actual name (has spaces; for display purposes).  Resolver 2
  takes one series (StoryMetaData array) from serials and populates it
  into currentSeries.  This data together is used for the story
  chooser component.  The final resolver (3) takes a story from the
  currentSeries and loads it into currentSection.  Thus, only one
  async call is made.*/

  serials = new BehaviorSubject<any>(undefined);
  seriesIDName = new BehaviorSubject<object>({});
  seriesTitles = new BehaviorSubject<StoryMetaData[]>(new StoryMetaData()[0]);
  storyType = new BehaviorSubject<string>('Scripts');
  currentSeries = new BehaviorSubject<string>('');
  currentSection = new BehaviorSubject<string>('');
  loading = new BehaviorSubject<boolean>(true);
  stream: Subscription;

  constructor() { }

  initializeMetaData(metaData: Observable<StoryMetaData[]>, type: string) {
    this.storyType.next(type);
    return this.stream = metaData.subscribe(stories => {
      return this.serials.next(this.serialize(stories))
    });
  }

  serialize(stories: StoryMetaData[]) {
    let serialize = {};
    let IDName = {};
    for(const story of stories) {
      if(story.Series in serialize) {
        serialize[story.Series].push(story);
      } else {
        serialize[story.Series] = [story];
        IDName[story.Series.split(' ').join('')] = story.Series;
      }
    }
    this.seriesIDName.next(IDName);
    return serialize;
  }

  getSeries(name: string): StoryMetaData[] {
    return this.serials.value[name];
  }

  initializeSeriesData(serieData: StoryMetaData[]) {
    this.getStory(serieData[0].ID);
    return this.seriesTitles.next(serieData);
  }

  getMetaData() {
    return this.serials;
  }
  getSeriesData() {
    return this.seriesTitles;
  }

  getStory(storyID:string): Observable<StoryMetaData> {
    return this.getSeriesData().pipe(
      map(stories => stories.find(stories =>
        stories.ID === storyID)) );
  }

  getType() {
    return this.storyType;
  }

  getCurrent(): Observable<any[]> {
    return of ([this.currentSeries,
                this.currentSection,
                this.storyType]);
  }
  
  
  changeSection(newSec: string) {
    this.currentSection.next(newSec);
  }

  changeSeries(newSec: string) {
    this.currentSeries.next(newSec);
    this.getSeriesData().pipe(
      tap(serie => this.changeSection(serie[0].ID))
    );
  }

  updateLoading(change: boolean) {
    this.loading.next(change);
  }

  dispose() {
    if(this.stream) {
      this.stream.unsubscribe();
    }
  }
}
