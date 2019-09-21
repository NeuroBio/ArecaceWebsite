import { Injectable }               from '@angular/core';
import { Resolve, Router,
  ActivatedRouteSnapshot }          from '@angular/router';

import { Observable, EMPTY, of }    from 'rxjs';
import { take, mergeMap }           from 'rxjs/operators';

import { StoryService }             from '../story.service'
import { FireBaseService }          from 'src/app/GlobalServices/firebase.service'
import { StoryMetaData }            from 'src/app/Classes/storymetadata';

@Injectable({
  providedIn: 'root'
})

export class StoryResolver1Service implements Resolve<any>{

  constructor(private firebaseserv: FireBaseService,
              private storyserv: StoryService,
              private router:Router) { }

  //see the story service for notes
  resolve(route: ActivatedRouteSnapshot): Observable<StoryMetaData[] | never>{
    const type = route.paramMap.get('StoryType');
    return this.firebaseserv.returnCollect(type).pipe(
        take(1),
        mergeMap(allStories => {
          if(allStories[0]){
            this.storyserv.initializeMetaData(allStories, type);
            return of (allStories);
          }else{
            this.router.navigate(['/story/Narratives']);
            return EMPTY;
          }
        })
    );
  }
  
}
