import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from 'src/app/administration/DashBoard/logout/logout.component';
@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoginComponent,
    LogoutComponent
  ]
})
export class LoginModule { }
