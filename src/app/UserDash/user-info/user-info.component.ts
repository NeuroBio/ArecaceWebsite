import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from 'src/app/Classes/ContentClasses';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { FormBuilder, ValidationErrors } from '@angular/forms';
import { userNameValidator } from './userNameValidator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  user: User;
  Form = this.createForm();
  message: string;
  stream: Subscription;

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.stream = this.auth.user.subscribe(user => 
      this.user = user);
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
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

}
