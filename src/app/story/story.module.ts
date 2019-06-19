import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { HttpClientModule }         from '@angular/common/http';

import { StoryRoutingModule }       from './story-routing.module';

import { SeriesChooserComponent }   from './serieschooser/serieschooser.component';
import { StorydisplayComponent }    from './storydisplay/storydisplay.component';
import { SharedModule }             from 'src/app/SharedComponents/shared.module';


@NgModule({
  declarations: [
    SeriesChooserComponent,
    StorydisplayComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    StoryRoutingModule
  ]
})

export class StoryModule { }
