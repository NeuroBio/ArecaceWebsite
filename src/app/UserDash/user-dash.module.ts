import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';


import { UserDashRoutingModule } from './user-dash-routing.module';
import { LoginModule } from '../SharedComponentModules/LoginButton/login.module';
import { SurveyComponentsModule } from '../playground/surveys/survey-components/survey-components.module';

import { UserDashComponent } from './user-dash/user-dash.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PickUpComponent } from './pick-up/pick-up.component';
import { DataOptionsComponent } from './interative-data/DataOptions/data-options.component';

@NgModule({
  declarations: [
    UserDashComponent,
    UserInfoComponent,
    PickUpComponent,
    DataOptionsComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    SurveyComponentsModule,

    UserDashRoutingModule
  ]
})
export class UserDashModule { }
