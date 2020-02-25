import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Classes/user';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userData = new BehaviorSubject<User>(null);
  constructor() { }

  assignUserData(user: any) {
    this.userData.next(user);
  }

  deleteEntry(type: string, index: number) {
    console.log(this.userData.value[type].slice(index,index+1))
  }
}
