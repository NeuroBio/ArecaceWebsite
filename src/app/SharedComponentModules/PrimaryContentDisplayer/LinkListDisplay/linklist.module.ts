import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router';

import { DropDownComponent }    from './drop-down/drop-down.component';
import { OptionsComponent }     from './options/options.component';
import { SideBarComponent }     from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    DropDownComponent,
    SideBarComponent,
    OptionsComponent,
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
