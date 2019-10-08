import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashComponent } from './user-dash/user-dash.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserDashRoutingModule } from './user-dash-routing.module';
import { LoginModule } from '../SharedComponentModules/LoginButton/login.module';

@NgModule({
  declarations: [
    UserDashComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    UserDashRoutingModule
  ]
})
export class UserDashModule { }
