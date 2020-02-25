import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitieshomeComponent } from './activitieshome/activitieshome.component';


const activeRoutes: Routes = [
  {path: 'activities', component: ActivitieshomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(activeRoutes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
