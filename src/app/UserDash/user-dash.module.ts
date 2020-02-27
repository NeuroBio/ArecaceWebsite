import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';


import { UserDashRoutingModule } from './user-dash-routing.module';
import { LoginModule } from '../SharedComponentModules/LoginButton/login.module';
import { SurveyComponentsModule } from '../playground/surveys/survey-components/survey-components.module';
import { PrimaryContentDisplayModule } from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { UserDashComponent } from './user-dash/user-dash.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PickUpComponent } from './pick-up/pick-up.component';
import { DataOptionsComponent } from './interactive-data/DataOptions/data-options.component';
import { InteractHomeComponent } from './interactive-data/interact-home/interact-home.component';
import { ViewDetailsComponent } from './interactive-data/view-details/view-details.component';

@NgModule({
  declarations: [
    UserDashComponent,
    UserInfoComponent,
    PickUpComponent,
    DataOptionsComponent,
    InteractHomeComponent,
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    SurveyComponentsModule,
    PrimaryContentDisplayModule,
    
    UserDashRoutingModule
  ]
})
export class UserDashModule { }
