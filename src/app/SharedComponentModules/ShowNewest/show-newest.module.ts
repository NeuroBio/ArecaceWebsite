import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowNewestComponent } from './show-newest/show-newest.component';
import { RouterModule } from '@angular/router';
import { NewItemComponent } from './new-item/new-item.component';

@NgModule({
  declarations: [
    ShowNewestComponent,
    NewItemComponent
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
