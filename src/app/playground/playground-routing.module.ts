import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component'
import { OthersArtComponent } from './others-art/others-art.component';
import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service'
import { BlowupmasterComponent } from '../SharedComponentModules/PrimaryContentDisplayer/GridBlowUp/blowupmaster/blowupmaster.component';
import { GeneralmemberresolverService } from '../GlobalServices/generalmemberresolver.service';
import { DateConverterComponent } from './CalcConvert/date-converter/date-converter.component';
import { SourceCalcFrameComponent } from './CalcConvert/source-calc-frame/source-calc-frame.component';

const playgroundRoutes: Routes = [
  {path: 'playground', component: PlaygroundhomeComponent,
  children: [
    {path: 'dateconvert', component: DateConverterComponent},
    {path: 'sourceaffinity', component: SourceCalcFrameComponent} 
  ]},
  {path: 'playground/othersart', component: OthersArtComponent,
  resolve: {GeneralcollectionresolverService},
  children: [
    {path: 'notfound', redirectTo: '/othersart'},
    {path: ':ExtraID', component: BlowupmasterComponent,
     resolve: {links: GeneralmemberresolverService}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(playgroundRoutes)],
  exports: [RouterModule]
})

export class PlaygroundRoutingModule { }
