import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ValidationErrors } from '@angular/forms';

import { Subscription } from 'rxjs';

import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { DashCRUDService } from '../dash-CRUD.service';
import { Title } from '@angular/platform-browser';

import { userNameValidator } from './userNameValidator';
import { User } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})

export class UserInfoComponent implements OnInit, OnDestroy {

  user: User;
  Form = this.createForm();
  message: string;
  dangerMessage: string;
  stream1: Subscription;
  stream2: Subscription;
  dangerNoodle = false;
  dangerButton = 'Reveal Spookiness';
  disabled = false;

  deleteAccountInfo = 'This button will delete your account and all data associated with it.';
  deleteDataInfo = 'This button will delete bookmark data and user data such as Fan Characters and Survey Results.  It will not affect the settings displayed on this page.';

  constructor(
    private firebaseserv: FireBaseService,
    private auth: AuthService,
    private fb: FormBuilder,
    private crud: DashCRUDService,
    private titleserv: Title
  ) { }

  ngOnInit() {
    this.titleserv.setTitle('Settings');
    this.stream1 = this.auth.user.subscribe(user => 
      this.user = user);

    this.stream2 = this.crud.message.subscribe(mess =>
      this.dangerMessage = mess);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.crud.dispose();
  }

  changeUserName() {
    this.message = '';
    if (this.Form.valid === true) {
      this.user.userName = this.Form.controls.newName.value;
      return this.firebaseserv.editDocument(this.user, 'Users', this.auth.uid.value)
      .then(() => this.onReset());
    } else {
      this.getFormValidationErrors();
    }
  }

  createForm() {
    return this.fb.group({
      newName: ['', [userNameValidator()]]
    });
  }

  getFormValidationErrors() {
    const controlErrors: ValidationErrors = this.Form.get('newName').errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        this.message = controlErrors[keyError].message;
      });
    }
  }

  onReset() {
    this.Form = this.createForm();
  }

  switchDanger() {
    this.dangerNoodle = !this.dangerNoodle;
    this.dangerButton = this.dangerNoodle === false ? 'Reveal Spookiness' : 'Hide Spookiness';
  }

  deleteData() {
    this.disabled = true;
    return this.crud.deleteAccountData(false)
    .then(() => this.disabled = false)
    .catch(() => this.disabled = false);
  }

  deleteAccount() {
    this.disabled = true;
    return this.crud.deleteAccountData(true)
    .then(() => this.disabled = false)
    .catch(() => this.disabled = false);
  }
}
