import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LinkListElementComponent } from './link-list-element/link-list-element.component';



@NgModule({
  declarations: [ LinkListElementComponent ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LinkListElementComponent]
})
export class LinkListElementModule { }
