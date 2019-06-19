import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';

import { GuildsMainComponent }    from './guildsmain/guildsmain.component';
import { GuildDetailsComponent }  from './guilddetails/guilddetails.component';

import { GuildsRoutingModule }    from './guilds-routing.module';
import { SharedModule }           from 'src/app/SharedComponents/shared.module';

@NgModule({
  declarations: [
    GuildsMainComponent,
    GuildDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GuildsRoutingModule
  ]
})

export class GuildsModule { }
