import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { WorldbuildingRoutingModule }   from './worldbuilding-routing.module';

import { BestiaryModule }               from './bestiary/bestiary.module';
import { CharactersModule }             from './characters/characters.module';
import { GuildsModule }                 from './guilds/guilds.module';
import { IntroductionComponent }        from './introduction/introduction.component';
import { MapsModule }                   from './maps/maps.module';
import { SourceSiphoidModule}           from './sourcesiphoid/sourcesiphoid.module';
import { WorldbuildingComponent }       from './worldbuilding/worldbuilding.component';



@NgModule({
  declarations: [
    IntroductionComponent,
    WorldbuildingComponent
  ],
  
  imports: [
    CommonModule,
    BestiaryModule,
    CharactersModule,
    GuildsModule,
    SourceSiphoidModule,
    MapsModule,

    WorldbuildingRoutingModule
  ]
})

export class WorldbuildingModule { }
