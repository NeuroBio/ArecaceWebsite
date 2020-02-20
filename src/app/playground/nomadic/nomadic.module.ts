import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NomadicHomeComponent } from './nomadic-home/nomadic-home.component';
import { LanguageTableModule } from '../../SharedComponentModules/language-table/language-table.module';
import { NomadicRoutingModule } from './nomadic-routing.module';
import { NomadicIntroductionComponent } from './nomadic-introduction/nomadic-introduction.component';
import { NomadicSyntaxComponent } from './nomadic-syntax/nomadic-syntax.component';
import { TranslateComponent } from './translate/translate.component';


@NgModule({
  declarations: [
    DictionaryComponent,
    NomadicHomeComponent,
    NomadicIntroductionComponent,
    NomadicSyntaxComponent,
    TranslateComponent
  ],
  imports: [
    CommonModule,
    LanguageTableModule,

    NomadicRoutingModule
  ]
})
export class NomadicModule { }
