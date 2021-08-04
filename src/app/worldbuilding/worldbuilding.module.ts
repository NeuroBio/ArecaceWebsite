import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BestiaryModule } from './bestiary/bestiary.module';
import { CharactersModule } from './characters/characters.module';
import { CultureModule } from './culture/culture.module';
import { GuildsModule } from './guilds/guilds.module';
import { ImageButtonModule } from 'src/app/SharedComponentModules/SmallComponents/image-button/image-button.module';
import { MapsModule } from './maps/maps.module';
import { SourceSiphoidModule} from './sourcesiphoid/sourcesiphoid.module';
import { WorldbuildingRoutingModule } from './worldbuilding-routing.module';

import { IntroductionComponent } from './introduction/introduction.component';
import { WorldbuildingComponent } from './worldbuilding/worldbuilding.component';

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
    ImageButtonModule,

    WorldbuildingRoutingModule
  ]
})

export class WorldbuildingModule { }
