import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponentsModule } from './survey-components/survey-components.module';


@NgModule({
  declarations: [ ],

  imports: [
    CommonModule,
    SurveyComponentsModule,
    SurveyRoutingModule // must be last!
  ]
})

export class SurveyModule { }
