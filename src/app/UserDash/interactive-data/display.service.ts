import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  currentDataType = new BehaviorSubject<string>(undefined);
  currentUserData = new BehaviorSubject<any[]>(undefined);
  currentID = new BehaviorSubject<string>(undefined);
  currentUserDatum = new BehaviorSubject<any>(undefined);
  stream: Subscription;

  constructor(private auth: AuthService,
              private generalcollectserv: GeneralcollectionService) { }

  assignData(type: string) {
    this.currentDataType.next(type);
    this.stream = this.auth.user.subscribe(user => {
      this.currentUserData.next(user[type]);
      if (this.currentID.value) {
        this.updateCurrentUserDatum(this.currentID.value);
      }
    });
    this.generalcollectserv.initializeMetaData(this.currentUserData, this.currentDataType.value);
  }

  updateCurrentUserDatum(ID: string) {
    const selected = this.currentUserData.value
    .find(datum => datum.ID === ID);
    if (selected) {
      this.currentUserDatum.next(selected);
      this.currentID.next(ID);
      return true;
    } else {
      this.currentUserDatum.next(undefined);
      this.currentID.next(undefined);
      return false;
    }
  }

  disposal() {
    if (this.stream) {
      this.stream.unsubscribe();
    }
    this.generalcollectserv.dispose();
  }
}
