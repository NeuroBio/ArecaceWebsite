import { Injectable }       from '@angular/core';
import { formatDate }       from '@angular/common';

import { FireBaseService }  from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  reasons: string[] = ["No", "Use", "Issue", "QorC", "No", "Typo", "Other"];

  constructor(private firebaseserv: FireBaseService) { }

  PushMessage(Data: any, index: number) {
    const messageData = this.cleanData(Data, index);
    return this.firebaseserv.uploadDocument(messageData, `Contact`);
  }

  cleanData(Data: any, index: number) {
    return {Reason: this.reasons[index],
            Name: Data.FirstName,
            Email: Data.Email,
            Message: Data.Message,
            Date: formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en')};
  }
}