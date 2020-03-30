import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule }         from '@angular/router';

import { ShowNewestComponent }  from './show-newest/show-newest.component';
import { NewItemComponent }     from './new-item/new-item.component';

import { LinkListElementModule} from '../SmallComponents/link-list-element/link-list-element.module';

@NgModule({
  declarations: [
    ShowNewestComponent,
    NewItemComponent
  ],
  imports: [
    CommonModule,
    LinkListElementModule,
    RouterModule,
  ],
  exports: [
    ShowNewestComponent
  ]
})
export class ShowNewestModule { }
