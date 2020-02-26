import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { MapsRoutingModule }            from './maps-routing.module';
import { PrimaryContentDisplayModule }  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { MapsMainComponent }            from './mapsmain/mapsmain.component';

@NgModule({
  declarations: [MapsMainComponent],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    
    MapsRoutingModule
  ]
})

export class MapsModule { }
