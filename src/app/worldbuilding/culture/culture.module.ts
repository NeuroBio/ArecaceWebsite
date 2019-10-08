import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { PrimaryContentDisplayModule }         from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { CultureRoutingModule } from './culture-routing.module';
import { CulturemainComponent } from './culturemain/culturemain.component';

@NgModule({
  declarations: [
    CulturemainComponent
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    CultureRoutingModule
  ]
})

export class CultureModule { }
