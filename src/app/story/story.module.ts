import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpClientModule }         from '@angular/common/http';

import { StoryRoutingModule }       from './story-routing.module';

import { SeriesChooserComponent }   from './serieschooser/serieschooser.component';
import { StorydisplayComponent }    from './storydisplay/storydisplay.component';
import { PrimaryContentDisplayModule }             from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';


@NgModule({
  declarations: [
    SeriesChooserComponent,
    StorydisplayComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PrimaryContentDisplayModule,
    StoryRoutingModule
  ]
})

export class StoryModule { }
