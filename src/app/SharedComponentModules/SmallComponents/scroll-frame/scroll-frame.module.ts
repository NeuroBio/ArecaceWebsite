import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollFrameComponent } from './scroll-frame/scroll-frame.component';



@NgModule({
  declarations: [ScrollFrameComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollFrameComponent
  ]
})
export class ScrollFrameModule { }
