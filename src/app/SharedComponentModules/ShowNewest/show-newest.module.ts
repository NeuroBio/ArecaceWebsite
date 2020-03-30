import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router';
import { A11yModule }           from '@angular/cdk/a11y';

import { ShowNewestComponent }  from './show-newest/show-newest.component';
import { NewItemComponent }     from './new-item/new-item.component';

@NgModule({
  declarations: [
    ShowNewestComponent,
    NewItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    A11yModule
  ],
  exports: [
    ShowNewestComponent
  ]
})
export class ShowNewestModule { }
