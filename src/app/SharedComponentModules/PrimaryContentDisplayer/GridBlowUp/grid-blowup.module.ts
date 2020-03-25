import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { A11yModule }             from '@angular/cdk/a11y';

import { BlowUpComponent }        from './blowup/blowup.component';
import { BlowupmasterComponent }  from './blowupmaster/blowupmaster.component';
import { GridComponent }          from './grid/grid.component';
import { BookmarkModule }         from '../../SmallComponents/bookmark/bookmark.module';

@NgModule({
  declarations: [
    BlowUpComponent,
    BlowupmasterComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    BookmarkModule,
    A11yModule,
    RouterModule
  ],
  exports: [
    BlowUpComponent,
    BlowupmasterComponent,
    GridComponent
  ]
})

export class GridBlowupModule { }
