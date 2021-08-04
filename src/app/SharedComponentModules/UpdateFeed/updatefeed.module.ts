import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';

import { UpdateFeedComponent }    from './updatefeed/updatefeed.component';
import { LinkListElementModule }  from '../SmallComponents/LinkList/link-list-element.module';

@NgModule({
  declarations: [
    UpdateFeedComponent
  ],
  imports: [
    CommonModule,
    LinkListElementModule
  ],
  exports: [
    UpdateFeedComponent
  ]
})

export class UpdatefeedModule { }
