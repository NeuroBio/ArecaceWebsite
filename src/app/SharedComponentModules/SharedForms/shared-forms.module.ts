import { NgModule }                           from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';

import { SourceAffinityCalculatorComponent }  from './SourceAffinityCalculator/source-affinity-calculator/source-affinity-calculator.component';
import { ButtonsComponent }                   from './Buttons/buttons/buttons.component';


@NgModule({
  declarations: [
    SourceAffinityCalculatorComponent,
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SourceAffinityCalculatorComponent,
    ButtonsComponent
  ]
})

export class SharedFormsModule { }
