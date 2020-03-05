import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';

import { LooseNotesRoutingModule }        from './loose-notes-routing.module';
import { PrimaryContentDisplayModule }    from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';
import { BookmarkModule }                 from 'src/app/SharedComponentModules/bookmark/bookmark.module';

import { MainNotesComponent }             from './main-notes/main-notes.component';
import { DetailsNotesComponent }          from './details-notes/details-notes.component';
@NgModule({
  declarations: [
    MainNotesComponent,
    DetailsNotesComponent
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    BookmarkModule,
    LooseNotesRoutingModule
  ]
})
export class LooseNotesModule { }
