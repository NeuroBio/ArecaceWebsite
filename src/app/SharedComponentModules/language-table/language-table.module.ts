import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageTableComponent } from './language-table/language-table.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LanguageTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LanguageTableComponent
  ]
})
export class LanguageTableModule { }
