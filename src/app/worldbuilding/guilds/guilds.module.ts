import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { GuildsMainComponent }          from './guildsmain/guildsmain.component';
import { GuildDetailsComponent }        from './guilddetails/guilddetails.component';

import { GuildsRoutingModule }          from './guilds-routing.module';
import { PrimaryContentDisplayModule }  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

@NgModule({
  declarations: [
    GuildsMainComponent,
    GuildDetailsComponent
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    GuildsRoutingModule
  ]
})

export class GuildsModule { }
