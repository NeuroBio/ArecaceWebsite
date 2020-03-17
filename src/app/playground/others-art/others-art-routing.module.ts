import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthersArtComponent } from '../others-art/main/others-art.component';
import { BlowupmasterComponent } from '../../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/blowupmaster/blowupmaster.component';

import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service'
import { GeneralmemberresolverService } from '../../GlobalServices/generalmemberresolver.service';
import { DownloadResolverService }          from 'src/app/SimplePages/downloadpage/download-resolver.service';


const routes: Routes = [
  {path: ':OtherID/Download',
  resolve: { DownloadResolverService },
  loadChildren: () => import('src/app/SimplePages/downloadpage/download-page.module').then(m => m.DownloadPageModule)},
  
  {path: '', component: OthersArtComponent,
  resolve: {GeneralcollectionresolverService},
  children: [
    {path: 'notfound', redirectTo: ''},
    {path: ':OtherID', component: BlowupmasterComponent,
     resolve: {links: GeneralmemberresolverService}},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersArtRoutingModule { }
