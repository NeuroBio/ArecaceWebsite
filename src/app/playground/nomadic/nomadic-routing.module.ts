import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NomadicHomeComponent } from './nomadic-home/nomadic-home.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NomadicIntroductionComponent } from './nomadic-introduction/nomadic-introduction.component';
import { NomadicSyntaxComponent } from './nomadic-syntax/nomadic-syntax.component';
import { TranslateComponent } from './translate/translate.component';
import { NomadicResolverService } from './nomadic-resolver.service';

const nomadRoutes: Routes = [
  {path: '', component: NomadicHomeComponent,
  resolve: {NomadicResolverService},
  children: [
    {path: '', redirectTo: 'introduction'},
    {path: 'dictionary', component: DictionaryComponent},
    {path: 'introduction', component: NomadicIntroductionComponent},
    {path: 'syntax', component: NomadicSyntaxComponent},
    {path: 'translate', component: TranslateComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(nomadRoutes)],
  exports: [RouterModule]
})

export class NomadicRoutingModule { }
