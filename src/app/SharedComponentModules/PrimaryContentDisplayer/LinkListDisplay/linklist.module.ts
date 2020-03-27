import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router';

import { DropDownComponent }    from './drop-down/drop-down.component';
import { OptionsComponent }     from './options/options.component';
import { SideBarComponent }     from './sidebar/sidebar.component';
import { LinkListElementComponent } from './link-list-element/link-list-element.component';
import { LinkListComponent } from './link-list/link-list.component';

@NgModule({
  declarations: [
    DropDownComponent,
    SideBarComponent,
    OptionsComponent,
    LinkListElementComponent,
    LinkListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DropDownComponent,
    SideBarComponent,
    OptionsComponent,
  ]
})

export class LinkListModule { }
