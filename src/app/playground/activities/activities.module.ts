import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { SharedFormsModule } from 'src/app/SharedComponentModules/SharedForms/shared-forms.module';
import { CharacterFormModule } from 'src/app/SharedComponentModules/SharedForms/MakeCharacter/character-form.module';
import { LoginToSaveModule } from 'src/app/SharedComponentModules/login-to-save/login-to-save.module';

import { ActivitieshomeComponent } from './activitieshome/activitieshome.component';
import { FanCharactersComponent } from './fan-characters/fan-characters.component';

@NgModule({
  declarations: [ActivitieshomeComponent, FanCharactersComponent],
  imports: [
    CommonModule,
    SharedFormsModule,
    CharacterFormModule,
    LoginToSaveModule,

    ActivitiesRoutingModule
  ]
})

export class ActivitiesModule { }
