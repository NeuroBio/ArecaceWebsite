import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalculatorsComponent } from './calculators/calculators.component';
import { DateConverterComponent } from './date-converter/date-converter.component';
import { SourceCalcFrameComponent } from './source-calc-frame/source-calc-frame.component';

import { CalcConvertRoutingModule } from './calc-convert-routing.module';
import { SharedFormsModule } from '../../../SharedComponentModules/SharedForms/shared-forms.module';
import { LoginToSaveModule } from 'src/app/SharedComponentModules/SmallComponents/login-to-save/login-to-save.module';


@NgModule({
  declarations: [
    CalculatorsComponent,
    DateConverterComponent,
    SourceCalcFrameComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedFormsModule,
    LoginToSaveModule,
    CalcConvertRoutingModule
  ],
  exports: [
    CalculatorsComponent
  ]
})
export class CalcConvertModule { }
