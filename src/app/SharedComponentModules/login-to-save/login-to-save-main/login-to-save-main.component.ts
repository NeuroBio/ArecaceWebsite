import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../../../administration/security/Auth/auth.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { FireBaseService } from '../../../GlobalServices/firebase.service';
import { User } from 'src/app/Classes/ContentClasses';
@Component({
  selector: 'app-login-to-save-main',
  templateUrl: './login-to-save-main.component.html',
  styleUrls: ['./login-to-save-main.component.css']
})

export class LoginToSaveMainComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private firebaseserv: FireBaseService) { }

  @Input() DatatoSave: any = {Test: 'Testing Data!'};
  @Input() DataType: string = "Type";
  @Input() NameTokens: string[];
  stopClicking: boolean;
  authorized: boolean;
  message: string;
  OldData: User;
  stream1: Subscription;
  stream2 = new Subscription();

  ngOnInit() {
    this.stream1 = this.auth.user.subscribe(user => {
      this.authorized = user? true : false
      if(user) {
        this.OldData = user;
      }
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }

  saveUserData() {
    console.log(this.DatatoSave);
    this.stopClicking = true;
    this.message = 'Processing...';
    this.DatatoSave.UploadTime = formatDate(new Date(), 'yyyy-MM-dd, HH:mm:ss', 'en');
    this.DatatoSave.UploadTimeShort = formatDate(new Date(), 'yy/MM/dd', 'en');
    this.DatatoSave.ID = `${this.OldData.ID}_${this.getUniqueId(4)}`
    this.DatatoSave.DisplayName = this.makeDisplayName();
    console.log(this.DatatoSave);

    if(this.OldData[this.DataType]) {// old data exists
      this.OldData[this.DataType].push(this.DatatoSave);
    } else { //first time this data pushed
      this.OldData[this.DataType] = [this.DatatoSave];
    }
    this.message = 'Submitting...';
    return this.firebaseserv.editDocument(this.OldData, `Users/`, this.auth.uid.value)
    .then(() => this.message = "Saved!")
    .catch(err => {
        this.message = err;
        this.stopClicking = false;
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

  makeDisplayName() {
    const displayName: string[] = [];
    this.NameTokens.forEach(token => 
      displayName.push(this.DatatoSave[token]));
    return displayName.join(' ');
  }
}
