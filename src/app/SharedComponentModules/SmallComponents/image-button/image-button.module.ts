import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ImageButtonComponent } from './image-button/image-button.component';


@NgModule({
  declarations: [ ImageButtonComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ImageButtonComponent
  ]
})
export class ImageButtonModule { }
