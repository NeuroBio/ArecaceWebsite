import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';

import { ExtrasRoutingModule }      from './extras-routing.module';
import { ExtrasMainComponent }    from './extrasmain/extrasmain.component';
import { GridBlowupModule }       from '../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';

@NgModule({
  declarations: [
    ExtrasMainComponent
  ],
  imports: [
    CommonModule,
    GridBlowupModule,

    ExtrasRoutingModule
  ]
})

export class ExtrasModule { }
