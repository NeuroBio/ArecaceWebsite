import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowNewestComponent } from './show-newest/show-newest.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ShowNewestComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ShowNewestComponent
  ]
})
export class ShowNewestModule { }
