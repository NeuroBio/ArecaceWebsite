import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyMainComponent } from './survey-main/survey-main.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SharedModule } from 'src/app/SharedComponents/shared.module';
import { SurveyDisplayComponent } from './survey-display/survey-display.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { SurveyPartsComponent } from './survey-parts/survey-parts.component';


@NgModule({
  declarations: [
    SurveyMainComponent,
    SurveyDisplayComponent,
    ResultsComponent,
    SurveyPartsComponent
  ],
  
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,

    SurveyRoutingModule //must be last!
  ]
})

export class SurveyModule { }
