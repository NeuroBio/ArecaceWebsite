import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { BestiaryComponent }                from './bestiary/bestiary.component';
import { BlowupmasterComponent}                   from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/blowupmaster/blowupmaster.component';

import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }     from 'src/app/GlobalServices/generalmemberresolver.service';

const bestiaryRoutes: Routes = [
  {path: 'world/bestiary', component: BestiaryComponent,
    resolve: {GeneralcollectionresolverService},
    children:[
      {path: 'notfound', redirectTo: '/world/bestiary'},
      {path: ':BeastID', component: BlowupmasterComponent,
      resolve: {links: GeneralmemberresolverService}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(bestiaryRoutes)],
  exports: [RouterModule]
})

export class BestiaryRoutingModule { }
