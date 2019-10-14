import { Injectable }                               from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router }  from '@angular/router';
import { HttpClient }                               from '@angular/common/http';

import { Observable, of, EMPTY }                    from 'rxjs';
import { take, map, flatMap }                       from 'rxjs/operators';

import { StoryService }                             from '../story.service';
import { StoryMetaData }                            from 'src/app/Classes/storymetadata';

@Injectable({
  providedIn: 'root'
})

export class StoryResolver3Service implements Resolve<any>{

  constructor(private storyserv: StoryService,
              private router: Router,
              private httpclient: HttpClient) { }

  //see the story service for notes
  resolve(route: ActivatedRouteSnapshot): Observable<any>{
     return this.checkUrl(route.paramMap.get('StoryID')).pipe(
      take(1),
      flatMap(ID => this.storyserv.getStory(ID).pipe(
          take(1),
          flatMap((metaData:StoryMetaData) => {
            if(metaData){
              this.storyserv.getStory(metaData.ID)
              this.storyserv.changeSection(metaData.ID);
              return this.getText(metaData.StoryLink).pipe(
                map(text => ({metaData, text}))
              );
            }else{
              this.router.navigate([`story/${route.parent.paramMap
                .get('StoryType')}/${route.parent.paramMap
                  .get('SeriesID')}`])
              return EMPTY
          }})
      ))
     )
  }

  
  
  getText(link:string): Observable<string>{
    return this.httpclient.get(link, {responseType: 'text'})
  }
  
  checkUrl(url:string){
    if(url === 'First'){
      return this.storyserv.getSeriesData().pipe(
        map(serie => serie[0].ID))
    }else{
      return of (url)
    }
  }
}