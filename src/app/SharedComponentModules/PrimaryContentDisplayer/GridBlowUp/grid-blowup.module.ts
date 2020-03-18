import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';

import { BlowUpComponent }        from './blowup/blowup.component';
import { BlowupmasterComponent }  from './blowupmaster/blowupmaster.component';
import { GridComponent }          from './grid/grid.component';
import { BookmarkModule }         from '../../bookmark/bookmark.module';
@NgModule({
  declarations: [
    BlowUpComponent,
    BlowupmasterComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    BookmarkModule,
    RouterModule
  ],
  exports: [
    BlowUpComponent,
    BlowupmasterComponent,
    GridComponent
  ]
})

export class GridBlowupModule { }
