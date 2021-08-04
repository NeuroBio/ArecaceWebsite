import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtrasRoutingModule } from './extras-routing.module';
import { GridBlowupModule } from '../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';
import { SliderModule } from 'src/app/SharedComponentModules/SmallComponents/slider/slider.module';

import { ExtrasMainComponent } from './extrasmain/extrasmain.component';

@NgModule({
  declarations: [
    ExtrasMainComponent
  ],
  imports: [
    CommonModule,
    GridBlowupModule,
    SliderModule,
    ExtrasRoutingModule
  ]
})

export class ExtrasModule { }
