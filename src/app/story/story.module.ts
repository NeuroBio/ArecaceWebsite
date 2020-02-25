import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { StoryRoutingModule }       from './story-routing.module';

import { SeriesChooserComponent }   from './serieschooser/serieschooser.component';
import { StorydisplayComponent }    from './storydisplay/storydisplay.component';
import { PrimaryContentDisplayModule }             from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';
import { BookmarkModule } from '../SharedComponentModules/bookmark/bookmark.module';

@NgModule({
  declarations: [
    SeriesChooserComponent,
    StorydisplayComponent
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    BookmarkModule,
    StoryRoutingModule
  ]
})

export class StoryModule { }
