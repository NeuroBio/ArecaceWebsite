import { Injectable }                     from '@angular/core';

import { BehaviorSubject, Subscription }  from 'rxjs';
import { map }                            from 'rxjs/operators';

import { CacheService }                   from 'src/app/GlobalServices/cache.service';

import { PostData }                       from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class UpdateService {

  posts = new BehaviorSubject<PostData[]>(undefined);
  message = new BehaviorSubject<string>(undefined);
  stream: Subscription;

  constructor(private cache: CacheService) { }

  getPosts() {
    if(this.cache.Cache['updates']) {
      return this.assignPosts();
    } else {
      this.message.next(undefined);
      return this.cache.addSubscription('updates', 'Inanity')
      .then(() => { return this.assignPosts();
      }).catch(() => {
        delete this.cache.Cache['updates'];
        this.message.next('Updates could not be retrieved. :<');
      });
    }
  }

  assignPosts() {
    this.stream = this.cache.Cache['updates']
    .pipe(map((posts: PostData[]) =>
        posts.sort((a,b) => a.Date > b.Date ? -1
        : a.Date !== b.Date ? 1
        : a.Time < b.Time ? 1
        : -1) )
    ).subscribe(posts => this.posts.next(posts));
  }
 
  dispose() {
    if(this.stream) {
      this.stream.unsubscribe();
    }
  }
}
