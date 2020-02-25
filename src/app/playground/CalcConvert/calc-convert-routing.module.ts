import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorsComponent } from './calculators/calculators.component'
import { DateConverterComponent } from './date-converter/date-converter.component'
import { SourceCalcFrameComponent } from './source-calc-frame/source-calc-frame.component';


const calcRoutes: Routes = [
  {path: '', component: CalculatorsComponent, children: [
    {path: 'dateconvert', component: DateConverterComponent},
    {path: 'sourceaffinity', component: SourceCalcFrameComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(calcRoutes)],
  exports: [RouterModule]
})
export class CalcConvertRoutingModule { }
