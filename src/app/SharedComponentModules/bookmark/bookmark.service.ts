import { Injectable } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { formatDate } from '@angular/common';

import { OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User, Bookmark } from '../../Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  userData = new BehaviorSubject<User>(null);
  loggedin = new BehaviorSubject<boolean>(null);
  stream: Subscription;

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService) {
    this.stream = this.auth.user.subscribe(user => {this.userData.next(user)});
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  addBookmark(type: string, path: string, name: string) {
    const data = this.userData.value;
      if(data[type]) {
        data[type].push({path: path, time: formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en'), name: name})
      } else {
        data[type] = [path]
      }
      return this.firebaseserv.editDocument(data, 'Users/', this.auth.uid.value);
  }

  removeBookmark(type: string, index: number) {
    const data = this.userData.value;
    data[type].splice(index, 1);
    return this.firebaseserv.editDocument(data, 'Users', this.auth.uid.value);
  }
}
