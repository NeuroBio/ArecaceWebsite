import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component'
import { OthersArtComponent } from './others-art/others-art.component';
import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service'
import { BlowupmasterComponent } from '../SharedComponents/blowupmaster/blowupmaster.component';
import { GeneralmemberresolverService } from '../GlobalServices/generalmemberresolver.service';

const playgroundRoutes: Routes = [
  {path: 'playground', component: PlaygroundhomeComponent},
  {path: 'playground/otherart', component: OthersArtComponent,
  resolve: {GeneralcollectionresolverService},
  children: [
    {path: 'notfound', redirectTo: '/extras'},
    {path: ':ExtraID', component: BlowupmasterComponent,
     resolve: {links: GeneralmemberresolverService}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(playgroundRoutes)],
  exports: [RouterModule]
})

export class PlaygroundRoutingModule { }
