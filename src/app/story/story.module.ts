import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { StoryRoutingModule }       from './story-routing.module';

import { SeriesChooserComponent }   from './serieschooser/serieschooser.component';
import { StorydisplayComponent }    from './storydisplay/storydisplay.component';
import { PrimaryContentDisplayModule }             from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { NgxAudioPlayerModule }     from 'ngx-audio-player';

@NgModule({
  declarations: [
    SeriesChooserComponent,
    StorydisplayComponent
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    NgxAudioPlayerModule,
    StoryRoutingModule
  ]
})

export class StoryModule { }
