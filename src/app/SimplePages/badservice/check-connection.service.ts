import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class CheckConnectionService {

  service = new BehaviorSubject<boolean>(undefined);
  online = new BehaviorSubject<boolean>(undefined);

  constructor(
    private firebaseserv: FireBaseService,
    private titleserv: Title
  ) { }

  testConnection() {
    this.titleserv.setTitle('Error: Bad Connection');
    this.service.next(undefined);
    this.online.next(navigator.onLine);
    if (navigator.onLine === true) {
      return this.firebaseserv.returnCollect('ConnectionTest')
      .pipe(take(1))
      .subscribe(response => {
        if (response[0]) {
          this.service.next(true);
        } else {
          this.service.next(false);
        }
      });
    } else {
      this.service.next(false);
    }

  }

  clear() {
    this.service.next(undefined);
  }
}
