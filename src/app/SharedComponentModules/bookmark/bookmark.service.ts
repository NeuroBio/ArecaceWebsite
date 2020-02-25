import { Injectable } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { GetRouteSegmentsService } from '../../GlobalServices/getroutesegments.service';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService) { }

  bookmark(type: string, path: string) {
    return this.firebaseserv.returnDocument(`Users/${this.auth.uid.value}`)
    .pipe(take(1)).toPromise()
    .then(data => {
      if(data[type]) {
        data[type].push(path)
      } else {
        data[type] = [path]
      }
      console.log(data[type])
      return this.firebaseserv.editDocument(data, 'Users/', this.auth.uid.value);
    });
  }
}
