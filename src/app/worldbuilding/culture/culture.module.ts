import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { SharedModule }         from 'src/app/SharedComponents/shared.module';

import { CultureRoutingModule } from './culture-routing.module';
import { CulturemainComponent } from './culturemain/culturemain.component';

@NgModule({
  declarations: [
    CulturemainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CultureRoutingModule
  ]
})

export class CultureModule { }
