import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { AuthService } from '../../administration/security/Auth/auth.service';
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { userNameValidator } from './userNameValidator';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;
  Form = this.createForm();
  message: string;

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
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
