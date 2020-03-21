import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from 'src/app/Classes/ContentClasses';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { FormBuilder, ValidationErrors } from '@angular/forms';
import { userNameValidator } from './userNameValidator';
import { Subscription } from 'rxjs';
import { DashCRUDService } from '../dash-CRUD.service';

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

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService,
              private fb: FormBuilder,
              private crud: DashCRUDService) { }

  ngOnInit() {
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
    if(this.Form.valid === true) {
      this.user.userName = this.Form.controls.newName.value
      return this.firebaseserv.editDocument(this.user, 'Users', this.auth.uid.value)
      .then(() => this.onReset());
    } else {
      this.getFormValidationErrors();
    }
  }

  createForm() {
    return this.fb.group({
      newName: ['', [userNameValidator()]]
    })
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
