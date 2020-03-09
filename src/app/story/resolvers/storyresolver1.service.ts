import { Injectable }               from '@angular/core';
import { Resolve, Router,
  ActivatedRouteSnapshot }          from '@angular/router';

import { Observable, EMPTY, of }    from 'rxjs';
import { take, mergeMap }           from 'rxjs/operators';

import { StoryService }             from '../story.service'
import { CacheService } from 'src/app/GlobalServices/cache.service';

@Injectable({
  providedIn: 'root'
})

export class StoryResolver1Service implements Resolve<any> {

  constructor(private storyserv: StoryService,
              private cache: CacheService,
              private router:Router) { }

  //see the story service for notes
  resolve(route: ActivatedRouteSnapshot) {
    let type = route.paramMap.get('StoryType');
    this.catchErrors(type);

    if(this.cache.Cache[type]) {
      return this.storyserv.initializeMetaData(this.cache.Cache[type], type);
    } else {
      // this.cache.addSubscription(type, this.firebaseserv.returnCollect(type));
      return this.cache.addSubscription(type, type)
      .then(() => {
        if(this.cache.Cache[type].value[0]) {
          this.storyserv.initializeMetaData(this.cache.Cache[type], type);
        } else {
          delete this.cache.Cache[type];
          this.router.navigate(['/story/Narratives']);
        }
      });
      // return this.firebaseserv.returnCollect(type).pipe(
      //   take(1),
      //   mergeMap(allStories => {
      //     if(allStories[0]) {
      //       this.storyserv.initializeMetaData(allStories, type);
      //       return of (allStories);
      //     } else {
      //       this.router.navigate(['/story/Narratives']);
      //       return EMPTY;
      //     }
      //   })
      // );
    }
  }
  
  catchErrors(type: string) {
    if(type === 'Script') {
      this.router.navigate(['/story/Scripts']);
      return EMPTY;
    }
    if(type !== 'Scripts' && type !== 'Narratives') {
      this.router.navigate(['/story/Narratives']);
      return EMPTY;
    }
  }
}
