import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';

import { MapsRoutingModule }  from './maps-routing.module';

import { MapsMainComponent }  from './mapsmain/mapsmain.component';
import { SharedModule }       from 'src/app/SharedComponents/shared.module';

@NgModule({
  declarations: [MapsMainComponent],
  imports: [
    CommonModule,
    SharedModule,
    
    MapsRoutingModule
  ]
})

export class MapsModule { }
