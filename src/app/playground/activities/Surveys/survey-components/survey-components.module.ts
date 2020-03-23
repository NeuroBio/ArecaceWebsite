import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { RouterModule }                 from '@angular/router';
import { ReactiveFormsModule }          from '@angular/forms';

import { PrimaryContentDisplayModule }  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';
import { LoginToSaveModule }            from '../../../../SharedComponentModules/SmallComponents/login-to-save/login-to-save.module';

import { SurveyMainComponent }          from './survey-main/survey-main.component';
import { SurveyDisplayComponent }       from './survey-display/survey-display.component';
import { ResultsComponent }             from './results/results.component';
import { SurveyPartsComponent }         from './survey-parts/survey-parts.component';
import { SurveyStatsComponent }         from './survey-stats/survey-stats.component';


@NgModule({
  declarations: [
    SurveyMainComponent,
    SurveyDisplayComponent,
    ResultsComponent,
    SurveyPartsComponent,
    SurveyStatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimaryContentDisplayModule,
    LoginToSaveModule,
    ReactiveFormsModule

  ],
  exports: [
    SurveyPartsComponent,
    SurveyMainComponent,
    ResultsComponent
  ]
})

export class SurveyComponentsModule { }
