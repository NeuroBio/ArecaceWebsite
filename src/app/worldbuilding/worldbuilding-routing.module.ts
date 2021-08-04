import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroductionComponent } from './introduction/introduction.component';
import { WorldbuildingComponent } from './worldbuilding/worldbuilding.component';

const worldRoutes: Routes = [
  { path: '', component: WorldbuildingComponent },
  { path: 'introduction', component: IntroductionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(worldRoutes)],
  exports: [RouterModule]
})

export class WorldbuildingRoutingModule { }
