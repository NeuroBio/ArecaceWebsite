import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component';
import { DateConverterComponent } from './date-converter/date-converter.component';
import { SurveyModule } from './surveys/survey.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OthersArtComponent } from './others-art/others-art.component';
import { SharedModule } from '../SharedComponents/shared.module';
import { PixelArmyComponent } from './pixel-army/pixel-army.component';
import { SharedFormsModule } from '../SharedForms/shared-forms.module';

@NgModule({
  declarations: [PlaygroundhomeComponent,
    DateConverterComponent,
    OthersArtComponent,
    PixelArmyComponent],
    
  imports: [
    CommonModule,
    SurveyModule,
    ReactiveFormsModule,
    SharedModule,
    SharedFormsModule,
    
    PlaygroundRoutingModule //must be last!
  ]
})

export class PlaygroundModule implements OnInit{

  ngOnInit(){
    window.scroll(0,0);
  }

 }