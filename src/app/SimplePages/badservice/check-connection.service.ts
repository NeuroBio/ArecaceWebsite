import { Injectable } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CheckConnectionService {

  service = new BehaviorSubject<boolean>(undefined);
  // error = new BehaviorSubject<string>(undefined);

  constructor(private firebaseserv: FireBaseService) { }

  testConnection() {
    this.service.next(undefined);
    return this.firebaseserv.returnCollect('ConnectionTest')
      .pipe(take(1))
      .subscribe(response => {
        if(response[0]) {
          this.service.next(true);
        } else {
          this.service.next(false);
        }
      });
    }

  clear() {
    this.service.next(undefined);
    // this.error.next(undefined);
  }
}
