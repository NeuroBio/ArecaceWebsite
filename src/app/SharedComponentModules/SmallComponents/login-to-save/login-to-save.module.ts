import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { LoginToSaveRoutingModule } from './login-to-save-routing.module';
import { LoginToSaveMainComponent } from './login-to-save-main/login-to-save-main.component';
import { LoginModule }              from '../LoginButton/login.module';

@NgModule({
  declarations: [LoginToSaveMainComponent],
  imports: [
    CommonModule,
    LoginModule,
    LoginToSaveRoutingModule
  ],
  exports: [
    LoginToSaveMainComponent
  ]
})

export class LoginToSaveModule { }
