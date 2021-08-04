import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { RouterModule }                     from '@angular/router';


import { GridBlowupModule }                 from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';
import { PrimaryContentDisplayModule }      from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';
import { BookmarkModule }                   from 'src/app/SharedComponentModules/SmallComponents/bookmark/bookmark.module';
import { SliderModule }                     from 'src/app/SharedComponentModules/SmallComponents/slider/slider.module';
import { TogglerModule }                     from 'src/app/SharedComponentModules/SmallComponents/toggler/toggler.module';

import { CharactersMainComponent }          from './charactersmain/charactersmain.component';
import { CharactersDetailsComponent }       from './charactersdetails/charactersdetails.component';
import { CharactersBlowupmasterComponent }  from './charactersblowupmaster/charactersblowupmaster.component';

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
    TogglerModule,
    RouterModule
  ],
  exports: [
    CharactersMainComponent,
    CharactersDetailsComponent,
    CharactersBlowupmasterComponent
  ]
})
export class CharacterComponentsModule { }
