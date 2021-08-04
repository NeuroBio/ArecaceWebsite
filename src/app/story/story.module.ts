import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { BookmarkModule }               from '../SharedComponentModules/SmallComponents/bookmark/bookmark.module';
import { StoryRoutingModule }           from './story-routing.module';
import { PrimaryContentDisplayModule }  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { SeriesChooserComponent }       from './serieschooser/serieschooser.component';
import { StorydisplayComponent }        from './storydisplay/storydisplay.component';

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
