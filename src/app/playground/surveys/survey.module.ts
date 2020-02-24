import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyMainComponent } from './survey-main/survey-main.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { PrimaryContentDisplayModule } from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';
import { SurveyDisplayComponent } from './survey-display/survey-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { SurveyPartsComponent } from './survey-parts/survey-parts.component';
import { SurveyStatsComponent } from './survey-stats/survey-stats.component';
import { LoginToSaveModule } from '../../SharedComponentModules/login-to-save/login-to-save.module';

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
    PrimaryContentDisplayModule,
    LoginToSaveModule,
    ReactiveFormsModule,

    SurveyRoutingModule //must be last!
  ]
})

export class SurveyModule { }
