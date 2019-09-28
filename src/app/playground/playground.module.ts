import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component';
import { SourceAffinityCalculatorComponent } from './SourceAffinityCalculator/source-affinity-calculator/source-affinity-calculator.component';
import { DateConverterComponent } from './date-converter/date-converter.component';

@NgModule({
  declarations: [PlaygroundhomeComponent,
    SourceAffinityCalculatorComponent,
    DateConverterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    PlaygroundRoutingModule
  ]
})

export class PlaygroundModule implements OnInit{

  ngOnInit(){
    window.scroll(0,0);
  }

 }