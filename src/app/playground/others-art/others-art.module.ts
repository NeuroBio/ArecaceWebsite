import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { GridBlowupModule }         from '../../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';
import { OthersArtRoutingModule }   from './others-art-routing.module';
import { SliderModule }             from 'src/app/SharedComponentModules/SmallComponents/slider/slider.module';
import { LinkListElementModule } from 'src/app/SharedComponentModules/SmallComponents/link-list-element/link-list-element.module';

import { OthersArtComponent }       from '../others-art/main/others-art.component';
import { PixelArmyComponent }       from '../others-art/pixel-army/pixel-army.component';


@NgModule({
  declarations: [
    OthersArtComponent,
    PixelArmyComponent
  ],
  imports: [
    CommonModule,
    GridBlowupModule,
    SliderModule,
    LinkListElementModule,
    OthersArtRoutingModule
  ]
})

export class OthersArtModule { }
