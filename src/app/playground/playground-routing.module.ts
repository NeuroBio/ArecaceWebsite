import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component'
import { OthersArtComponent } from './others-art/others-art.component';
import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service'
import { BlowupmasterComponent } from '../SharedComponents/blowupmaster/blowupmaster.component';
import { GeneralmemberresolverService } from '../GlobalServices/generalmemberresolver.service';
import { DateConverterComponent } from './date-converter/date-converter.component';
import { SourceAffinityCalculatorComponent } from '../SharedForms/SourceAffinityCalculator/source-affinity-calculator/source-affinity-calculator.component';

const playgroundRoutes: Routes = [
  {path: 'playground', component: PlaygroundhomeComponent,
  children: [
    {path: 'dateconvert', component: DateConverterComponent},
    {path: 'sourceaffinity', component: SourceAffinityCalculatorComponent} 
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
