import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { WorldbuildingRoutingModule }   from './worldbuilding-routing.module';
import { IntroductionComponent }        from './introduction/introduction.component';
import { WorldbuildingComponent }       from './worldbuilding/worldbuilding.component';

import { BestiaryModule }               from './bestiary/bestiary.module';
import { CharactersModule }             from './characters/characters.module';
import { GuildsModule }                 from './guilds/guilds.module';
import { MapsModule }                   from './maps/maps.module';
import { SourceSiphoidModule}           from './sourcesiphoid/sourcesiphoid.module';
import { CultureModule }                from './culture/culture.module';



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
    CultureModule,
    MapsModule,

    WorldbuildingRoutingModule
  ]
})

export class WorldbuildingModule { }
