import { NgModule }                 from '@angular/core';
import { RouterModule }             from '@angular/router';
import { CommonModule }             from '@angular/common';

import { LinkListElementComponent } from './link-list-element/link-list-element.component';
import { LinkListComponent }        from './link-list/link-list.component';


@NgModule({
  declarations: [
    LinkListElementComponent,
    LinkListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LinkListElementComponent,
    LinkListComponent
  ]
})
export class LinkListElementModule { }
