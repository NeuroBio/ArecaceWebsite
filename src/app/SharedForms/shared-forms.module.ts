import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedFormsRoutingModule } from './shared-forms-routing.module';
import { SourceAffinityCalculatorComponent } from '../SharedForms/SourceAffinityCalculator/source-affinity-calculator/source-affinity-calculator.component';
import { CharacterFormComponent }       from '../SharedForms/MakeCharacter/characterform/characterform.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SourceAffinityCalculatorComponent,
    CharacterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedFormsRoutingModule
  ],
  exports: [
    SourceAffinityCalculatorComponent,
    CharacterFormComponent
  ]
})
export class SharedFormsModule { }
