import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { GuildsMainComponent }          from './guildsmain/guildsmain.component';
import { GuildDetailsComponent }        from './guilddetails/guilddetails.component';

import { GuildsRoutingModule }          from './guilds-routing.module';
import { PrimaryContentDisplayModule }  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';
import { BookmarkModule }               from 'src/app/SharedComponentModules/SmallComponents/bookmark/bookmark.module';
@NgModule({
  declarations: [
    GuildsMainComponent,
    GuildDetailsComponent
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    BookmarkModule,
    GuildsRoutingModule
  ]
})

export class GuildsModule { }
