import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashComponent } from './user-dash/user-dash.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserDashRoutingModule } from './user-dash-routing.module';
import { LoginModule } from '../SharedComponentModules/LoginButton/login.module';
import { PickUpComponent } from './pick-up/pick-up.component';
import { UserDataComponent } from './user-data/user-data.component';

@NgModule({
  declarations: [
    UserDashComponent,
    UserInfoComponent,
    PickUpComponent,
    UserDataComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    UserDashRoutingModule
  ]
})
export class UserDashModule { }
