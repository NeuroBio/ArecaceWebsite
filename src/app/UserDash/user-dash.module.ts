import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { ReactiveFormsModule }            from '@angular/forms';


import { CharacterComponentsModule }      from 'src/app/worldbuilding/characters/character-components/character-components.module';
import { CharacterFormModule }            from 'src/app/SharedComponentModules/SharedForms/MakeCharacter/character-form.module';
import { LoginModule }                    from '../SharedComponentModules/SmallComponents/LoginButton/login.module';
import { PrimaryContentDisplayModule }    from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';
import { ScrollFrameModule }              from 'src/app/SharedComponentModules/SmallComponents/scroll-frame/scroll-frame.module';
import { SharedFormsModule }              from 'src/app/SharedComponentModules/SharedForms/shared-forms.module';
import { SurveyComponentsModule }         from '../playground/activities/Surveys/survey-components/survey-components.module';
import { UserDashRoutingModule }          from './user-dash-routing.module';

import { DashButtonsComponent }           from './interactive-data/dash-buttons/dash-buttons.component';
import { DataOptionsComponent }           from './interactive-data/DataOptions/data-options.component';
import { InteractDetailsSwitchComponent } from './interactive-data/interact-details-switch/interact-details-switch.component';
import { InteractHomeComponent }          from './interactive-data/interact-home/interact-home.component';
import { PickUpComponent }                from './interactive-data/pick-up/pick-up.component';
import { UserDashComponent }              from './user-dash/user-dash.component';
import { UserInfoComponent }              from './user-info/user-info.component';

@NgModule({
  declarations: [
    UserDashComponent,
    UserInfoComponent,
    PickUpComponent,
    DataOptionsComponent,
    InteractHomeComponent,
    InteractDetailsSwitchComponent,
    DashButtonsComponent,
  ],
  imports: [
    CommonModule,
    LoginModule,
    ReactiveFormsModule,
    SurveyComponentsModule,
    PrimaryContentDisplayModule,
    SharedFormsModule,
    CharacterComponentsModule,
    CharacterFormModule,
    ScrollFrameModule,
    
    UserDashRoutingModule
  ]
})

export class UserDashModule { }
