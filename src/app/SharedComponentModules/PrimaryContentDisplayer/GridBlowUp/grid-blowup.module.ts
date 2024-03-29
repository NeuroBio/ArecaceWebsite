import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { A11yModule }             from '@angular/cdk/a11y';

import { BookmarkModule }         from '../../SmallComponents/bookmark/bookmark.module';
import { LinkListElementModule }  from '../../SmallComponents/LinkList/link-list-element.module';
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
    A11yModule, //REQUIRED FOR FOCUSTRAP
    RouterModule
  ],
  exports: [
    BlowUpComponent,
    BlowupmasterComponent,
    GridComponent
  ]
})

export class GridBlowupModule { }
