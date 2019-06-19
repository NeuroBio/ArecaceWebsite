import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component'

const playgroundRoutes: Routes = [
  {path: "playground", component: PlaygroundhomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(playgroundRoutes)],
  exports: [RouterModule]
})

export class PlaygroundRoutingModule { }
