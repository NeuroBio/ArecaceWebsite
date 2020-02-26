import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';

import { CharactersRoutingModule }          from './characters-routing.module';
import { GridBlowupModule }                 from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/grid-blowup.module';
import { PrimaryContentDisplayModule }      from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { CharactersMainComponent }          from './charactersmain/charactersmain.component';
import { CharactersDetailsComponent }       from './charactersdetails/charactersdetails.component';
import { CharactersBlowupmasterComponent }  from './charactersblowupmaster/charactersblowupmaster.component';
import { HomeComponent }                    from './home/home.component';


@NgModule({
  declarations: [
    CharactersMainComponent,
    CharactersDetailsComponent,
    CharactersBlowupmasterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    GridBlowupModule,
    PrimaryContentDisplayModule,
    CharactersRoutingModule
  ]
})

export class CharactersModule { }
