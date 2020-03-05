import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Classes/ContentClasses';
import { FireBaseService } from '../GlobalServices/firebase.service';
import { AuthService } from '../administration/security/Auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userData = new BehaviorSubject<User>(null);

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService) { }

  assignUserData(user: any) {
    this.userData.next(user);
  }

  deleteEntry(type: string, index: number) {
    const data = this.userData.value;

    //kill images
    if(data[type][index].Links) {
      data[type][index].Links.forEach(link => {
        this.firebaseserv.deleteImage(link);
      })
    }
    data[type].splice(index,1);

    //remove from user data
    return this.firebaseserv.editDocument(data, 'Users', this.auth.uid.value);
  }
}
