import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { RouterModule }               from '@angular/router';

import { DetailsDisplayComponent }    from './ContentDisplay/details-display/details-display.component';
import { MainDisplayComponent }       from './ContentDisplay/main-display/main-display.component';
import { NotFoundComponent }          from './ContentDisplay/notfound/notfound.component';
import { LinkListModule }             from './LinkListDisplay/linklist.module'
import { GridBlowupModule }           from './GridBlowUp/grid-blowup.module';
import { BookmarkModule }             from '../SmallComponents/bookmark/bookmark.module';


@NgModule({
  declarations: [
    MainDisplayComponent,
    DetailsDisplayComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    LinkListModule,
    GridBlowupModule,
    BookmarkModule,
    RouterModule
  ],
  exports: [
    MainDisplayComponent,
    DetailsDisplayComponent,
    NotFoundComponent,
  ]
})

export class PrimaryContentDisplayModule { }
