import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';


import { GridBlowupModule }                 from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';
import { PrimaryContentDisplayModule }      from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { CharactersMainComponent }          from './charactersmain/charactersmain.component';
import { CharactersDetailsComponent }       from './charactersdetails/charactersdetails.component';
import { CharactersBlowupmasterComponent }  from './charactersblowupmaster/charactersblowupmaster.component';
import { BookmarkModule }                   from 'src/app/SharedComponentModules/bookmark/bookmark.module';
import { SliderModule }                     from 'src/app/SharedComponentModules/slider/slider.module';
@NgModule({
  declarations: [
    CharactersMainComponent,
    CharactersDetailsComponent,
    CharactersBlowupmasterComponent
  ],
  imports: [
    CommonModule,
    GridBlowupModule,
    PrimaryContentDisplayModule,
    BookmarkModule,
    SliderModule,
    RouterModule
  ],
  exports: [
    CharactersMainComponent,
    CharactersDetailsComponent,
    CharactersBlowupmasterComponent
  ]
})
export class CharacterComponentsModule { }
