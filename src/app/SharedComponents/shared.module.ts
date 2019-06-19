import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { RouterModule }               from '@angular/router';

import { BlowUpComponent }            from './blowup/blowup.component';
import { DetailsDisplayComponent }    from './details-display/details-display.component';
import { GridComponent }              from './grid/grid.component';
import { MainDisplayComponent }       from './main-display/main-display.component';
import { SideBarComponent }           from './sidebar/sidebar.component';
import { NotFoundComponent }          from './notfound/notfound.component';
import { BlowupmasterComponent } from './blowupmaster/blowupmaster.component'

@NgModule({
  declarations: [
    SideBarComponent,
    MainDisplayComponent,
    DetailsDisplayComponent,
    GridComponent,
    BlowUpComponent,
    NotFoundComponent,
    BlowupmasterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideBarComponent,
    MainDisplayComponent,
    DetailsDisplayComponent,
    GridComponent,
    BlowUpComponent,
    NotFoundComponent
  ]
})

export class SharedModule { }
