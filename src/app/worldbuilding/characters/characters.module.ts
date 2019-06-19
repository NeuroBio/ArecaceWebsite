import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { CharactersRoutingModule }      from './characters-routing.module';

import { CharactersMainComponent }      from './charactersmain/charactersmain.component';
import { CharactersDetailsComponent }   from './charactersdetails/charactersdetails.component';
import { HomeComponent }                from './home/home.component';
import { CharactersBlowupmasterComponent } from './charactersblowupmaster/charactersblowupmaster.component';

import { SharedModule }                 from 'src/app/SharedComponents/shared.module';

@NgModule({
  declarations: [
    CharactersMainComponent,
    CharactersDetailsComponent,
    CharactersBlowupmasterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CharactersRoutingModule
  ]
})

export class CharactersModule { }
