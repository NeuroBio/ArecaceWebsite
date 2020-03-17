import { Injectable }                               from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router }  from '@angular/router';
import { HttpClient }                               from '@angular/common/http';

import { Observable, of, EMPTY }                    from 'rxjs';
import { take, map, tap, flatMap }                  from 'rxjs/operators';

import { StoryService }                             from '../story.service';
import { StoryMetaData }                            from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class StoryResolver3Service implements Resolve<any>{

  constructor(private storyserv: StoryService,
              private router: Router,
              private httpclient: HttpClient) { }

  //see the story service for notes
  resolve(route: ActivatedRouteSnapshot): Observable<any>{
    const ID = route.paramMap.get('StoryID');
    if(this.checkUrl(ID, route) === true) {
      return;
    }

    return this.storyserv.getStory(ID).pipe(
      take(1),
      flatMap((metaData:StoryMetaData) => {
        if(metaData) {
          this.storyserv.getStory(metaData.ID);
          this.storyserv.changeSection(metaData.ID);
          return this.getText(metaData.StoryLink).pipe(
            map(text => ({metaData, text})) );

        } else {
          this.router.navigate([`story/${route.parent.paramMap
                                .get('StoryType')}/${route.parent.paramMap
                                .get('SeriesID')}`]);
          return EMPTY;
      }
    }) );
  }

  
  
  getText(link:string): Observable<string> {
    return this.httpclient.get(link, {responseType: 'text'});
  }
  
  checkUrl(ID: string, route: ActivatedRouteSnapshot) {
    if(ID === 'First') {
      const serie = this.storyserv.getSeriesData().value;
      this.router.navigate([`story/${route.parent.paramMap
                            .get('StoryType')}/${route.parent.paramMap
                            .get('SeriesID')}/${serie[0].ID}`]);
      return true;
    } else {
      return false;
    }
  }
}