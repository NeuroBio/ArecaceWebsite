import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { BestiaryRoutingModule }    from './bestiary-routing.module';
import { GridBlowupModule }         from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';

import { BestiaryComponent }        from './bestiary/bestiary.component';
import { SliderModule }             from 'src/app/SharedComponentModules/SmallComponents/slider/slider.module';

@NgModule({
  declarations: [
    BestiaryComponent
  ],
  imports: [
    CommonModule,
    GridBlowupModule,
    SliderModule,
    BestiaryRoutingModule
  ]
})

export class BestiaryModule { }
