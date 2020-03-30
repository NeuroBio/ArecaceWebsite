import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';

import { BookmarkModule }         from '../../SmallComponents/bookmark/bookmark.module';
import { LinkListElementModule }  from '../../SmallComponents/link-list-element/link-list-element.module';
import { BlowUpComponent }        from './blowup/blowup.component';
import { BlowupmasterComponent }  from './blowupmaster/blowupmaster.component';
import { GridComponent }          from './grid/grid.component';

@NgModule({
  declarations: [
    BlowUpComponent,
    BlowupmasterComponent,
    GridComponent,
  ],
  imports: [
    CommonModule,
    BookmarkModule,
    LinkListElementModule,
    RouterModule
  ],
  exports: [
    BlowUpComponent,
    BlowupmasterComponent,
    GridComponent
  ]
})

export class GridBlowupModule { }
