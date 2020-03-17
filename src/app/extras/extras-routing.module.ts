import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { ExtrasMainComponent }              from './extrasmain/extrasmain.component';
import { BlowupmasterComponent }            from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/blowupmaster/blowupmaster.component';

import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }     from 'src/app/GlobalServices/generalmemberresolver.service';
import { DownloadResolverService }          from 'src/app/SimplePages/downloadpage/download-resolver.service';


const extrasRoutes: Routes = [
  {path: ':ExtraID/Download',
    resolve: { DownloadResolverService },
    loadChildren: () => import('src/app/SimplePages/downloadpage/download-page.module').then(m => m.DownloadPageModule)},
  
  {path:'', component: ExtrasMainComponent,
  resolve: {GeneralcollectionresolverService},
  children:[
    {path: 'notfound', redirectTo: ''},
    {path: ':ExtraID', component: BlowupmasterComponent,
        resolve: {links: GeneralmemberresolverService}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(extrasRoutes)],
  exports: [RouterModule]
})
export class ExtrasRoutingModule { }
