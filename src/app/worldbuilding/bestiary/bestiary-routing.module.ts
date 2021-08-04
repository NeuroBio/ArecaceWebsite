import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }     from 'src/app/GlobalServices/generalmemberresolver.service';

import { BestiaryComponent }                from './bestiary/bestiary.component';
import { BlowupmasterComponent}             from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/blowupmaster/blowupmaster.component';

const bestiaryRoutes: Routes = [
  { path: 'bestiary/:BeastID/Download',
    loadChildren: () => import('src/app/SimplePages/downloadpage/download-page.module').then(m => m.DownloadPageModule) },

  { path: 'bestiary', component: BestiaryComponent,
    resolve: { GeneralcollectionresolverService },
    children: [
      { path: 'notfound', redirectTo: '' },
      { path: ':BeastID', component: BlowupmasterComponent,
        resolve: { links: GeneralmemberresolverService } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(bestiaryRoutes)],
  exports: [RouterModule]
})

export class BestiaryRoutingModule { }
