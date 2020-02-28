import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { AuthService } from '../../administration/security/Auth/auth.service';
import { formatDate } from '@angular/common';
import { FireBaseService } from '../../GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginToSaveService {

  message = new BehaviorSubject<string>(undefined);
  stopClick = new BehaviorSubject<boolean>(undefined);

  constructor(private auth: AuthService,
              private firebaseserv: FireBaseService) { }

  processForm (oldData: any, dataToSave: any, nameTokens: string[],
    dataType: string, ) {
    console.log(dataToSave);
    this.stopClick.next(true);
    this.message.next('Processing...');
    dataToSave.UploadTime = formatDate(new Date(), 'yyyy-MM-dd, HH:mm:ss', 'en');
    dataToSave.UploadTimeShort = formatDate(new Date(), 'yy/MM/dd', 'en');
    dataToSave.DisplayName = this.makeDisplayName(nameTokens, dataToSave);
    dataToSave.ID = `${oldData.ID}_${this.getUniqueId(4)}`
    console.log(dataToSave);

    if(oldData[dataType]) {// old data exists
      oldData[dataType].push(dataToSave);
    } else { //first time this data pushed
      oldData[dataType] = [dataToSave];
    }
    this.message.next('Submitting...');
    return this.firebaseserv.editDocument(oldData, `Users/`, this.auth.uid.value)
    .then(() => this.message.next("Saved!"))
    .catch(err => {
        this.message = err;
        this.stopClick.next(false);
    });
  }

  getUniqueId(parts: number): string {
    const stringArr = [];
    for(let i = 0; i< parts; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
    //https://stackoverflow.com/questions/52836247/how-to-generate-uuid-in-angular-6
  }

  makeDisplayName(nameTokens: string[], dataToSave: any) {
    const displayName: string[] = [];
    nameTokens.forEach(token => 
      displayName.push(dataToSave[token]));
    return displayName.join(' ');
  }
}
