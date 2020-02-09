import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewestCueService {

  constructor(private firebaseserv: FireBaseService) { }

  updateCue(newItem: any, type: string) {
    newItem.UploadTime = formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en')
    this.firebaseserv.returnCollectionWithKeys('NewestCue').pipe(take(1))
    .subscribe(newest => {
      if(newest.length >= 25) {
        newest = newest.sort((a,b) => a.UploadTime > b.UploadTime ? 1 : -1);
        const deleteKey = newest[newest.length-1].key;
        this.firebaseserv.deleteDocument('NewestCue', deleteKey);
      }

      this.firebaseserv.uploadDocument(newItem, 'NewestCue')
    });
  }
}