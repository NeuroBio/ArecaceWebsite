import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../../../administration/security/Auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login-to-save-main',
  templateUrl: './login-to-save-main.component.html',
  styleUrls: ['./login-to-save-main.component.css']
})
export class LoginToSaveMainComponent implements OnInit, OnDestroy {

  constructor(private auth: AuthService) { }

  @Input() DatatoSave: any = 'Testing Data!';
  authorized: boolean;
  stream1: Subscription;

  ngOnInit() {
    this.stream1 = this.auth.user.subscribe(user => this.authorized = user? true : false);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

  saveUserData() {
    console.log(this.DatatoSave)
  }
}
