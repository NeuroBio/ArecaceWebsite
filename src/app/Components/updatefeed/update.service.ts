import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private firebaseserv: FireBaseService) { }

  getPosts(){
    return this.firebaseserv.returnCollect('Inanity').pipe(map(posts =>
      posts.sort((a,b) => a.Date > b.Date ? -1 :
        a.Date !== b.Date ? 1 : a.Time < b.Time ? 1 : -1)
    ));
  }
 
}
