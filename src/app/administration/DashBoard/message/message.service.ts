import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  newMessages = new BehaviorSubject<any>('');
  savedMessages = new BehaviorSubject<any>('');

  initilizeData(data: any[]) {
    this.newMessages.next(data[0]);
    this.savedMessages.next(data[1]);
  }

  getNewMessages() {
    return this.newMessages;
  }

  getOldMessages() {
    return this.savedMessages;
  }
}
