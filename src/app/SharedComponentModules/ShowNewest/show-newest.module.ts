import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShowNewestComponent } from './show-newest/show-newest.component';

import { LinkListElementModule} from '../SmallComponents/LinkList/link-list-element.module';

@NgModule({
  declarations: [
    ShowNewestComponent,
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
