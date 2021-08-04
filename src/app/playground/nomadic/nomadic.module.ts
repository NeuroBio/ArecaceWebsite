import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { LanguageTableModule } from '../../SharedComponentModules/language-table/language-table.module';
import { NomadicRoutingModule } from './nomadic-routing.module';
import { TogglerModule } from '../../SharedComponentModules/SmallComponents/toggler/toggler.module';

import { DictionaryComponent } from './dictionary/dictionary.component';
import { NomadicHomeComponent } from './nomadic-home/nomadic-home.component';
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
    ReactiveFormsModule,
    LanguageTableModule,
    TogglerModule,

    NomadicRoutingModule
  ]
})

export class NomadicModule { }
