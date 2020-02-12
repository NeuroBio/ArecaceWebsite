import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageTableComponent } from './language-table/language-table.component';



@NgModule({
  declarations: [
    LanguageTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LanguageTableComponent
  ]
})
export class LanguageTableModule { }
