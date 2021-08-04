import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';

import { CharactersRoutingModule }          from './characters-routing.module';
import { CharacterComponentsModule }        from './character-components/character-components.module';

import { HomeComponent }                    from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CharacterComponentsModule,
    
    CharactersRoutingModule
  ]
})

export class CharactersModule { }
