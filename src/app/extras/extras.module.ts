import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';

import { MiscRoutingModule }      from './extras-routing.module';
import { ExtrasMainComponent }    from './extrasmain/extrasmain.component';
import { SharedModule }           from 'src/app/SharedComponents/shared.module'

@NgModule({
  declarations: [
    ExtrasMainComponent
  ],
  imports: [
    CommonModule,
    MiscRoutingModule,
    SharedModule
  ]
})

export class ExtrasModule { }
