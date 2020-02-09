import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourceAffinityCalculatorComponent } from './SourceAffinityCalculator/source-affinity-calculator/source-affinity-calculator.component';
import { CharacterFormComponent }       from './MakeCharacter/characterform/characterform.component';
import { ButtonsComponent } from './Buttons/buttons/buttons.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SourceAffinityCalculatorComponent,
    CharacterFormComponent,
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SourceAffinityCalculatorComponent,
    CharacterFormComponent,
    ButtonsComponent
  ]
})
export class SharedFormsModule { }
