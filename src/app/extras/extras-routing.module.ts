import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { ExtrasMainComponent }              from './extrasmain/extrasmain.component';
import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }     from 'src/app/GlobalServices/generalmemberresolver.service';
import { BlowupmasterComponent }            from 'src/app/SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/blowupmaster/blowupmaster.component';

const extrasRoutes: Routes = [
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
