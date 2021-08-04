import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

import { take } from 'rxjs/operators';

import { FireBaseService } from 'src/app/GlobalServices/firebase.service';

import { AllPathInfo } from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})
export class NewestCueService {

  AllPathInfo = new AllPathInfo();

  constructor(private firebaseserv: FireBaseService) { }

  updateCue(newItem: any, type: string, change: string) {
    newItem.UploadTime = formatDate(new Date(), 'yyyy-MM-dd, HH:mm', 'en');
    newItem.UploadType = AllPathInfo[type].Type;
    newItem.DirectLink = this.makeLink(type, newItem);
    newItem.UploadName = this.makeName(type, newItem);
    newItem.UploadChange = change;

    // no need to wait!  This is not a priority
    if (change === 'Created') {
      this.firebaseserv.returnCollectionWithKeys('NewestCue').pipe(take(1))
      .subscribe(newest => {
        if (newest.length >= 25) {
          newest = newest.sort((a, b) => a.UploadTime > b.UploadTime ? -1 : 1);
          const deleteKey = newest[newest.length - 1].key;
          this.firebaseserv.deleteDocument('NewestCue', deleteKey);
        }
        this.firebaseserv.uploadDocument(newItem, 'NewestCue');
      });
    }
  }

  makeLink(type: string, newItem: any) {
    if (this.AllPathInfo[type].ExtraPath) {
      return `${this.AllPathInfo[type].DirectLink}/${this.AllPathInfo[type].ExtraPath}/${newItem.ID}`;
    } else {
      return `${this.AllPathInfo[type].DirectLink}/${newItem.ID}`;
    }
  }

  makeName(type: string, newItem: any) {
    const nameTokens = [];
    this.AllPathInfo[type].NameTokens.forEach(token => 
      nameTokens.push(newItem[token]));
    return nameTokens.join(' ');
  }
}
