import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Classes/ContentClasses';
import { FireBaseService } from '../GlobalServices/firebase.service';
import { AuthService } from '../administration/security/Auth/auth.service';
import { CRUDdata }                 from 'src/app/Classes/ContentClasses';
import { CRUD } from 'src/app/administration/services/CRUD.service';

@Injectable({
  providedIn: 'root'
})

export class DashCRUDService {

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService,
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

  editEntry(uploadInfo: CRUDdata, type: string, index: number) {
    const OldData = this.auth.user.value;

    if(uploadInfo.NewImageLinks[0]) {
      uploadInfo.NewImageLinks = this.correctLinks(uploadInfo.NewImageLinks,
                                                   uploadInfo.MetaData.ID, type);
    }

    return this.CRUD.editImages(uploadInfo.NewImageLinks,
      uploadInfo.ImageBlobs, uploadInfo.OldImageLinks)
    .then(links => {
      if(links[0]) {
        uploadInfo.MetaData.Links = links;
      }
      //load in edited data
      OldData[type][index] = uploadInfo.MetaData; 
      return this.firebaseserv.editDocument(OldData, `Users/`, this.auth.uid.value)
    }).then(() => {
      return Promise.resolve();
    }).catch(err => {
      return Promise.reject(err);
    });
  }

  deleteEntry(type: string, index: number) {
    const data = this.auth.user.value;

    //kill images
    if(data[type][index].Links) {
      this.deleteImages(data[type][index]);
    }

    //remove from user data
    data[type].splice(index,1);
    return this.firebaseserv.editDocument(data, 'Users', this.auth.uid.value);
  }

  deleteImages(Links: string[]) {
    Links.forEach(link => {
      this.firebaseserv.deleteImage(link);
    });
  }

}
