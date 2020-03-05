import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'
import { AuthService } from '../../administration/security/Auth/auth.service';
import { formatDate } from '@angular/common';
import { FireBaseService } from '../../GlobalServices/firebase.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { take, skip } from 'rxjs/operators';
import { User } from 'src/app/Classes/ContentClasses';
@Injectable({
  providedIn: 'root'
})
export class LoginToSaveService {

  message = new BehaviorSubject<string>(undefined);
  stopClick = new BehaviorSubject<boolean>(undefined);
  trigger = new Subject();
  reset = new Subject();
  autoTrigger: boolean = false;

  nameTokens: string[];
  type: string;

  constructor(private auth: AuthService,
              private firebaseserv: FireBaseService,
              private fetcher: FetchService) { }


  assignUserDataInfo (tokens: string[], type: string): void {
    this.nameTokens = tokens;
    this.type = type;
  }

  saveData() {
    if(this.autoTrigger === true) {
      this.fetcher.fetchData();
      this.trigger.next();
      return this.fetcher.activeFormData.pipe(take(1))
      .subscribe(data => {
        this.processForm(data)
      });
    } else {
      return this.processForm(this.fetcher.activeFormData.value);
    }
  }

  processForm (dataToSave: any) {
    if(dataToSave[0] === "abort") {
      return this.message.next(dataToSave[1])
    }
    dataToSave = dataToSave[0];
    const oldData = this.auth.user.value;

    this.assignStopClick(true);
    this.message.next('Processing...');
    dataToSave.UploadTime = formatDate(new Date(), 'yyyy-MM-dd, HH:mm:ss', 'en');
    dataToSave.UploadTimeShort = formatDate(new Date(), 'yy/MM/dd', 'en');
    dataToSave.DisplayName = this.makeDisplayName(this.nameTokens, dataToSave);
    dataToSave.ID = `${oldData.ID}_${this.getUniqueId(4)}`

    
    if(oldData[this.type]) {// old data exists
      oldData[this.type].push(dataToSave);
    } else { //first time this data pushed
      oldData[this.type] = [dataToSave];
    }


    this.message.next('Submitting...');
    return this.firebaseserv.editDocument(oldData, `Users/`, this.auth.uid.value)
    .then(() => {
      this.message.next("Saved!");
      this.reset.next();
    })
    .catch(err => {
        this.message = err;
        this.assignStopClick(false);
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
  }
}
