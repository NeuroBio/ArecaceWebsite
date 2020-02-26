import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridBlowupModule } from '../../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';
import { OthersArtComponent } from '../others-art/main/others-art.component';
import { PixelArmyComponent } from '../others-art/pixel-army/pixel-army.component';

import { OthersArtRoutingModule } from './others-art-routing.module';

@NgModule({
  declarations: [
    OthersArtComponent,
    PixelArmyComponent
  ],
  imports: [
    CommonModule,
    GridBlowupModule,
    OthersArtRoutingModule
  ]
})
export class OthersArtModule { }