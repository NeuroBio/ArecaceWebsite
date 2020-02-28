import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitieshomeComponent } from './activitieshome/activitieshome.component';
import { FanCharactersComponent } from './fan-characters/fan-characters.component';


const activeRoutes: Routes = [
  {path: '', component: ActivitieshomeComponent},
  {path: 'makefancharacter', component: FanCharactersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(activeRoutes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
