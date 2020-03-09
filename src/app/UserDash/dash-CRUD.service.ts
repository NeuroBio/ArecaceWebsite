import { Injectable }               from '@angular/core';
import { Router }                   from '@angular/router'
import { formatDate }               from '@angular/common';

import { BehaviorSubject }          from 'rxjs';
import { take }                     from 'rxjs/operators';

import { FireBaseService }          from '../GlobalServices/firebase.service';
import { AuthService }              from '../administration/security/Auth/auth.service';
import { CRUD }                     from 'src/app/administration/services/CRUD.service';
//import { GeneralcollectionService } from '../GlobalServices/generalcollection.service';
import { FetchService }             from 'src/app/GlobalServices/fetch.service';

import { CRUDdata }                 from 'src/app/Classes/ContentClasses';
import { UserDataNameTokens }       from 'src/app/Classes/UploadDownloadPaths';
@Injectable({
  providedIn: 'root'
})

export class DashCRUDService {

  message = new BehaviorSubject<string>(undefined);
  NameTokens = new UserDataNameTokens();

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService,
  //            private gencollectserv: GeneralcollectionService,
              private router: Router,
              private fetcher: FetchService,
              private CRUD: CRUD) { }

  correctLinks(links: string[], ID: string, type: string) {
    return links.map(link => {
      const fragments = link.split('/');
      const keyFrag = fragments[fragments.length-1];
      return `UserData/${this.auth.uid.value}/${type}/${keyFrag}-${ID}`;
    });

  }

  createEntry(uploadInfo: CRUDdata, type: string) {
    const OldData = this.auth.user.value;

    uploadInfo.MetaData.UploadTime = formatDate(new Date(), 'yyyy-MM-dd, HH:mm:ss', 'en');
    uploadInfo.MetaData.UploadTimeShort = formatDate(new Date(), 'yy/MM/dd', 'en');
    uploadInfo.MetaData.DisplayName = this.makeDisplayName(this.NameTokens[type], uploadInfo.MetaData);
    uploadInfo.MetaData.ID = `${this.auth.user.value.ID}_${this.getUniqueId(4)}`

    if(uploadInfo.NewImageLinks[0]) {
      uploadInfo.NewImageLinks = this.correctLinks(uploadInfo.NewImageLinks,
                                                   uploadInfo.MetaData.ID, type);
    }

    //upload images if any
    return this.CRUD.uploadImages(uploadInfo.NewImageLinks, uploadInfo.ImageBlobs)
    .then(links => {
      if(links[0]) {
        uploadInfo.MetaData.Links = links;
      }
      
      if(OldData[type]) {// old data exists
        OldData[type].push(uploadInfo.MetaData);
      } else { //first time this data pushed
        OldData[type] = [uploadInfo.MetaData];
      }

      //finally upload the metadata
      return this.firebaseserv.editDocument(OldData, `Users/`, this.auth.uid.value)
    }).then(() => {
      return Promise.resolve();
    }).catch(err => {
      if(uploadInfo.MetaData.Links) {//remove any uploaded images
        this.deleteImages(uploadInfo.MetaData.Links);
      }
      return Promise.reject(err);
    });
  }

  editEntry(ID: string) {
    this.message.next('Processing...');
    this.fetcher.assignLoading(true);
    this.fetcher.fetchData();
    return this.fetcher.activeFormData.pipe(take(1))
    .subscribe(uploadInfo => {
      
      if(uploadInfo.Abort) {
        return this.message.next(uploadInfo.AbortMessage);
      }
      const OldData = this.auth.user.value;
      const typeindex = this.getIDandType(ID);

      uploadInfo.MetaData = this.replaceUserValues(uploadInfo.MetaData,
        OldData[typeindex.Type][typeindex.Index], typeindex.Type);
      
      if(uploadInfo.NewImageLinks[0]) {
        uploadInfo.NewImageLinks = this.correctLinks(uploadInfo.NewImageLinks,
                                                     uploadInfo.MetaData.ID,
                                                     typeindex.Type);
      }

      this.message.next('Editing...')
      return this.CRUD.editImages(uploadInfo.NewImageLinks,
        uploadInfo.ImageBlobs, uploadInfo.OldImageLinks)
      .then(links => {
        if(links[0]) {
          uploadInfo.MetaData.Links = links;
        }
        //load in edited data
        OldData[typeindex.Type][typeindex.Index] = uploadInfo.MetaData; 
        return this.firebaseserv.editDocument(OldData, `Users/`, this.auth.uid.value)
      }).then(() => {
    //    this.gencollectserv.initializeMetaData(OldData[typeindex.Type], typeindex.Type);//reset in list
        this.fetcher.assignItemtoEdit(OldData[typeindex.Type][typeindex.Index]);//reset active data
        this.message.next('Edit successful!');
        this.fetcher.assignLoading(false);
        return Promise.resolve();
      }).catch(err => {
        this.fetcher.assignLoading(false);
        return Promise.reject(err);
      });
    })
  }

  deleteEntry(ID: any) {
    this.message.next('Deleting...')
    this.fetcher.assignLoading(true);
    const data = this.auth.user.value;
    let typeindex: any;
      typeindex = this.getIDandType(ID);

    //kill images
    if(data[typeindex.Type][typeindex.Index].Links) {
      this.deleteImages(data[typeindex.Type][typeindex.Index]);
    }

    //remove from user data
    data[typeindex.Type].splice(typeindex.Index,1);
    return this.firebaseserv.editDocument(data, 'Users', this.auth.uid.value)
    .then(() => {
    //  this.gencollectserv.initializeMetaData(data[typeindex.Type] , typeindex.Type);

      if(data[typeindex.Type][0]) {
        this.router.navigate([`/dash/${typeindex.Type}`],
          {queryParamsHandling: "merge"});
        this.message.next('')
      } else { //no members remain
        this.router.navigate(['/dash']);
      }
      this.fetcher.assignLoading(false);
    }).catch(err => {
      this.fetcher.assignLoading(false);
      this.message.next(err);
    });
  }

  deleteBookmark(index: number, type: string) {
    const data = this.auth.user.value;
    //remove from user data
    data[type].splice(index,1);
    return this.firebaseserv.editDocument(data, 'Users', this.auth.uid.value);
  }

  deleteImages(Links: string[]) {
    Links.forEach(link => {
      this.firebaseserv.deleteImage(link);
    });
  }

  getIDandType(ID: string) {
    //const type = this.gencollectserv.type.value;
    //const index = this.gencollectserv.collectionData.value
    //  .findIndex(dex => dex.ID === ID);
    return({Type: '', Index: 0});
  }

  replaceUserValues(newData: any, oldData: any, type: string) {
    newData.UploadTime = oldData.UploadTime;
    newData.UploadTimeShort = oldData.UploadTimeShort;
    newData.DisplayName = this.makeDisplayName(this.NameTokens[type], newData);
    newData.ID = oldData.ID;
    return newData;
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
