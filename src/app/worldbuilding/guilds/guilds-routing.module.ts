import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }     from 'src/app/GlobalServices/generalmemberresolver.service';

import { GuildsMainComponent }              from './guildsmain/guildsmain.component';
import { GuildDetailsComponent }            from './guilddetails/guilddetails.component';
import { NotFoundComponent }                from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component'

const guildRoutes: Routes = [
  { path: 'guilds', component: GuildsMainComponent,
  resolve: {GeneralcollectionresolverService },
  children: [
    { path: '', redirectTo: 'DIA', pathMatch: 'full' },
    { path: 'notfound', component:NotFoundComponent },
    { path: ':GuildID', component: GuildDetailsComponent,
      resolve: { Guild: GeneralmemberresolverService } }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(guildRoutes)],
  exports: [RouterModule]
})

export class GuildsRoutingModule { }
