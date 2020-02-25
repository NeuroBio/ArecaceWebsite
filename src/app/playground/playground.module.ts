import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component';

import { ShowNewestModule } from '../SharedComponentModules/ShowNewest/show-newest.module';

import { SurveyModule } from './surveys/survey.module';
import { LooseNotesModule } from './LooseNotes/loose-notes.module';
import { NomadicModule } from './nomadic/nomadic.module';
import { CalcConvertModule } from './CalcConvert/calc-convert.module';
import { OthersArtModule}  from './others-art/others-art.module'

@NgModule({
  declarations: [PlaygroundhomeComponent,
  ],
    
  imports: [
    CommonModule,
    SurveyModule,
    LooseNotesModule,
    ShowNewestModule,
    NomadicModule,
    CalcConvertModule,
    OthersArtModule,
    
    PlaygroundRoutingModule //must be last!
  ]
})

export class PlaygroundModule implements OnInit{

  ngOnInit(){
    window.scroll(0,0);
  }

 }