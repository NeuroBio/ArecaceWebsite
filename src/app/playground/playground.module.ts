import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component';
import { DateConverterComponent } from './CalcConvert/date-converter/date-converter.component';
import { SurveyModule } from './surveys/survey.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OthersArtComponent } from './others-art/others-art.component';
import { PixelArmyComponent } from './pixel-army/pixel-army.component';
import { SharedFormsModule } from '../SharedComponentModules/SharedForms/shared-forms.module';
import { ShowNewestModule } from '../SharedComponentModules/ShowNewest/show-newest.module';
import { CalculatorsComponent } from './CalcConvert/calculators/calculators.component';
import { SourceCalcFrameComponent } from './CalcConvert/source-calc-frame/source-calc-frame.component';
import { GridBlowupModule } from '../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';
import { LooseNotesModule } from './LooseNotes/loose-notes.module';
import { LanguageTableModule } from '../SharedComponentModules/language-table/language-table.module';
import { NomadicHomeComponent } from './nomadic/nomadic-home/nomadic-home.component';

@NgModule({
  declarations: [PlaygroundhomeComponent,
    DateConverterComponent,
    OthersArtComponent,
    PixelArmyComponent,
    CalculatorsComponent,
    SourceCalcFrameComponent,
    NomadicHomeComponent,
],
    
  imports: [
    CommonModule,
    SurveyModule,
    LooseNotesModule,
    ReactiveFormsModule,
    SharedFormsModule,
    ShowNewestModule,
    GridBlowupModule,
    LanguageTableModule,
    
    PlaygroundRoutingModule //must be last!
  ]
})

export class PlaygroundModule implements OnInit{

  ngOnInit(){
    window.scroll(0,0);
  }

 }