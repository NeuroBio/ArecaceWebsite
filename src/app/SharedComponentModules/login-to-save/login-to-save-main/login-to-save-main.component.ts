import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../../../administration/security/Auth/auth.service';
import { Subscription } from 'rxjs';
import { LoginToSaveService } from '../login-to-save.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';
@Component({
  selector: 'app-login-to-save-main',
  templateUrl: './login-to-save-main.component.html',
  styleUrls: ['./login-to-save-main.component.css']
})

export class LoginToSaveMainComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private logintosaveserv: LoginToSaveService,
              private fetcher: FetchService) { }

  Disabled: boolean;
  stopClicking: boolean;
  authorized: boolean;
  message: string;
  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;
  stream4: Subscription;

  ngOnInit() {
    this.stream1 = this.auth.user.subscribe(user =>
      this.authorized = user? true : false//this.auth.isUser()
      );
    this.stream2 = this.logintosaveserv.stopClick
      .subscribe(click => this.stopClicking = click);
    this.stream3 = this.logintosaveserv.message
      .subscribe(message => this.message = message);    
    this.stream4 = this.fetcher.valid
      .subscribe(valid => this.Disabled = !valid);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
    this.stream4.unsubscribe();
    this.logintosaveserv.disposal();
  }

  saveUserData() {
    return this.logintosaveserv.saveData();
  }


}
