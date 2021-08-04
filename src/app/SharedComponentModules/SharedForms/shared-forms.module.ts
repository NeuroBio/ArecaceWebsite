import { NgModule }                           from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';

import { SourceAffinityCalculatorComponent }  from './SourceAffinityCalculator/source-affinity-calculator/source-affinity-calculator.component';
import { ButtonsComponent }                   from './Buttons/buttons/buttons.component';
import { CheckboxComponent }                  from './checkbox/checkbox.component';
import { ToolTipComponent }                   from './tool-tip/tool-tip.component';


@NgModule({
  declarations: [
    SourceAffinityCalculatorComponent,
    ButtonsComponent,
    CheckboxComponent,
    ToolTipComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SourceAffinityCalculatorComponent,
    ButtonsComponent,
    CheckboxComponent,
    ToolTipComponent
  ]
})

export class SharedFormsModule { }
