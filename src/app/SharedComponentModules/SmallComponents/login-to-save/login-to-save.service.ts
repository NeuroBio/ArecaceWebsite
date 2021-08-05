import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { FetchService } from 'src/app/GlobalServices/fetch.service';

import { DashCRUDService } from 'src/app/UserDash/dash-CRUD.service';
import { CRUDdata } from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class LoginToSaveService {

  message = new BehaviorSubject<string>(undefined);
  stopClick = new BehaviorSubject<boolean>(undefined);
  reset = new Subject();
  autoTrigger = false;
  type: string;

  constructor(
    private fetcher: FetchService,
    private crud: DashCRUDService
  ) { }


  assignType (type: string): void {
    this.type = type;
  }

  saveData() {
    this.assignStopClick(true);
    this.message.next('Processing...');

    if (this.autoTrigger === true) {
      this.fetcher.fetchData();
      return this.fetcher.activeFormData.pipe(take(1))
      .subscribe(data => this.processForm(data));
    } else {
      return this.processForm(this.fetcher.activeFormData.value);
    }
  }

  processForm (uploadInfo: CRUDdata) {

    // quit if data invalid
    if (uploadInfo.Abort === true) {
      this.assignStopClick(false);
      return this.message.next(uploadInfo.AbortMessage);
    }

    this.message.next('Submitting...');
    return this.crud.createEntry(uploadInfo, this.type)
    .then(() => {
      this.message.next('Saved!');
      this.reset.next();
    }).catch(err => {
      this.message = err;
      this.assignStopClick(false);
    });
  }

  assignStopClick(click: boolean) {
    return this.stopClick.next(click);
  }

  assignAutoTrigger(trigger: boolean) {
    this.autoTrigger = trigger;
  }

  disposal() {
    this.message.next('');
    this.assignStopClick(false);
    this.assignAutoTrigger(false);
    this.crud.dispose();
  }
}
