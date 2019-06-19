import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { BestiaryRoutingModule }    from './bestiary-routing.module';

import { BestiaryComponent }        from './bestiary/bestiary.component';
import { SharedModule }             from 'src/app/SharedComponents/shared.module';

@NgModule({
  declarations: [
    BestiaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BestiaryRoutingModule
  ]
})

export class BestiaryModule { }
