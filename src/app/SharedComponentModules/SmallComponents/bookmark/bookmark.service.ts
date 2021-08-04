import { Injectable }                     from '@angular/core';
import { formatDate }                     from '@angular/common';

import { Subscription, BehaviorSubject }  from 'rxjs';

import { FireBaseService }                from 'src/app/GlobalServices/firebase.service';
import { AuthService }                    from '../../../administration/security/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  stream: Subscription;
  real = new BehaviorSubject<boolean>(true);

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService) {
  }

  addBookmark(type: string, path: string, name: string) {
    const data = this.auth.user.value;
    if(data[type]) {
      data[type].push({ path: path, time: formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en'), name: name });
    } else {
      data[type] = [{ path: path, time: formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en'), name: name }];
    }
    return this.firebaseserv.editDocument(data, 'Users/', this.auth.uid.value);
  }

  removeBookmark(type: string, index: number) {
    const data = this.auth.user.value;
    data[type].splice(index, 1);
    return this.firebaseserv.editDocument(data, 'Users', this.auth.uid.value);
  }

  dispose() {
    this.real.next(true);
  }
}
