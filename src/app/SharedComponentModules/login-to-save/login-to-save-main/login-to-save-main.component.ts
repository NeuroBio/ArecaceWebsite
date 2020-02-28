import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../../../administration/security/Auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Classes/ContentClasses';
import { LoginToSaveService } from '../login-to-save.service';

@Component({
  selector: 'app-login-to-save-main',
  templateUrl: './login-to-save-main.component.html',
  styleUrls: ['./login-to-save-main.component.css']
})

export class LoginToSaveMainComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
              private logintosaveserv: LoginToSaveService) { }

  @Input() DatatoSave: any = {Test: 'Testing Data!'};
  @Input() DataType: string = "Type";
  @Input() NameTokens: string[];
  @Input() Disabled: boolean = false;
  stopClicking: boolean;
  authorized: boolean;
  message: string;
  OldData: User;
  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;

  ngOnInit() {
    this.stream1 = this.auth.user.subscribe(user => {
      this.authorized = user? true : false
      if(user) {
        this.OldData = user;
      }
    });
    this.stream2 = this.logintosaveserv.stopClick
      .subscribe(click => this.stopClicking = click);
    this.stream3 = this.logintosaveserv.message
      .subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

  saveUserData() {
    return this.logintosaveserv.processForm(this.OldData, this.DatatoSave,
                                            this.NameTokens, this.DataType);
  }


}
