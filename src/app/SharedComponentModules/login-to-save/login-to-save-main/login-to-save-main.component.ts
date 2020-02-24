import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../../../administration/security/Auth/auth.service';
import { Subscription } from 'rxjs';
import { FireBaseService } from '../../../GlobalServices/firebase.service';
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
  stopClicking: boolean;
  authorized: boolean;
  message: string;
  stream1: Subscription;

  ngOnInit() {
    this.stream1 = this.auth.user.subscribe(user => this.authorized = user? true : false);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  saveUserData() {
    this.stopClicking = true;
    this.message = 'Submitting...';
    return this.firebaseserv.uploadDocument(this.DatatoSave,
      `Users/${this.auth.uid.value}/${this.DataType}`)
    .then(() => this.message = "Saved!")
    .catch(err => {
        this.message = err;
        this.stopClicking = false;
    });
  }
}
