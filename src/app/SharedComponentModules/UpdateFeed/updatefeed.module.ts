import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { UpdateFeedComponent }  from './updatefeed/updatefeed.component';

@NgModule({
  declarations: [
    UpdateFeedComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UpdateFeedComponent
  ]
})

export class UpdatefeedModule { }
