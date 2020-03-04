import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OthersArtComponent } from '../others-art/main/others-art.component';
import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service'
import { BlowupmasterComponent } from '../../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/blowupmaster/blowupmaster.component';
import { GeneralmemberresolverService } from '../../GlobalServices/generalmemberresolver.service';


const routes: Routes = [
  {path: '', component: OthersArtComponent,
  resolve: {GeneralcollectionresolverService},
  children: [
    {path: 'notfound', redirectTo: ''},
    {path: ':ExtraID', component: BlowupmasterComponent,
     resolve: {links: GeneralmemberresolverService}},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersArtRoutingModule { }
