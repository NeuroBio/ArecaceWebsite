import { Injectable }               from '@angular/core';
import { formatDate }               from '@angular/common';

import { BehaviorSubject, Subject } from 'rxjs';
import { take }                     from 'rxjs/operators';

import { AuthService }              from '../../administration/security/Auth/auth.service';
import { FireBaseService }          from '../../GlobalServices/firebase.service';
import { FetchService }             from 'src/app/GlobalServices/fetch.service';
import { CRUD }                     from 'src/app/administration/services/CRUD.service';

import { CRUDdata }                 from 'src/app/Classes/ContentClasses';

@Injectable({
  providedIn: 'root'
})

export class LoginToSaveService {

  message = new BehaviorSubject<string>(undefined);
  stopClick = new BehaviorSubject<boolean>(undefined);
  reset = new Subject();
  autoTrigger: boolean = false;

  nameTokens: string[];
  type: string;

  constructor(private auth: AuthService,
              private firebaseserv: FireBaseService,
              private fetcher: FetchService,
              private CRUD: CRUD) { }


  assignUserDataInfo (tokens: string[], type: string): void {
    this.nameTokens = tokens;
    this.type = type;
  }

  saveData() {
    this.assignStopClick(true);
    this.message.next('Processing...');

    if(this.autoTrigger === true) {
      this.fetcher.fetchData();
      return this.fetcher.activeFormData.pipe(take(1))
      .subscribe(data => this.processForm(data));
    } else {
      return this.processForm(this.fetcher.activeFormData.value);
    }
  }

  processForm (uploadInfo: CRUDdata) {

    //quit if data invalid
    if(uploadInfo.Abort === true) {
      this.assignStopClick(false);
      return this.message.next(uploadInfo.AbortMessage);
    }

    //Still processing
    const dataToSave = uploadInfo.MetaData;
    const oldData = this.auth.user.value;

    dataToSave.UploadTime = formatDate(new Date(), 'yyyy-MM-dd, HH:mm:ss', 'en');
    dataToSave.UploadTimeShort = formatDate(new Date(), 'yy/MM/dd', 'en');
    dataToSave.DisplayName = this.makeDisplayName(this.nameTokens, dataToSave);
    dataToSave.ID = `${oldData.ID}_${this.getUniqueId(4)}`
    
    if(uploadInfo.NewImageLinks[0]) {
      console.log("sensed links!")
      uploadInfo.NewImageLinks = this.correctLinks(uploadInfo.NewImageLinks, dataToSave.ID);
    }

    //upload images if any
    this.message.next('Submitting...');
    return this.CRUD.uploadImages(uploadInfo.NewImageLinks, uploadInfo.ImageBlobs)
    .then(links => {

      if(links[0]) {
        dataToSave.Links = links;
      }
      
      if(oldData[this.type]) {// old data exists
        oldData[this.type].push(dataToSave);
      } else { //first time this data pushed
        oldData[this.type] = [dataToSave];
      }

      //finally upload the metadata
      return this.firebaseserv.editDocument(oldData, `Users/`, this.auth.uid.value)
    }).then(() => {
      this.message.next("Saved!");
      this.reset.next();
    }).catch(err => {
        this.message = err;
        this.assignStopClick(false);

        //remove any uploaded images
        if(dataToSave.Links) {
          dataToSave.Links.forEach(link =>{
            this.firebaseserv.deleteImage(link);
          });
        }
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

  correctLinks(links: string[], ID: string) {
    return links.map(link => {
      const fragments = link.split('/');
      const keyFrag = fragments[fragments.length-1];
      return `UserData/${this.auth.uid.value}/${this.type}/${keyFrag}-${ID}`;
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
  }
}
