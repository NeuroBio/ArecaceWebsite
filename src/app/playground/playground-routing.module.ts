import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component'

const playgroundRoutes: Routes = [
  {path: '', component: PlaygroundhomeComponent},
  {path: 'calc',
    loadChildren: () => import('./CalcConvert/calc-convert.module').then(m => m.CalcConvertModule)},
  {path: 'nomadic',
    loadChildren: () => import('./nomadic/nomadic.module').then(m => m.NomadicModule)},
  {path: 'surveys',
    loadChildren: () => import('./surveys/survey.module').then(m => m.SurveyModule)},
  {path: 'notes',
    loadChildren: () => import('./LooseNotes/loose-notes.module').then(m => m.LooseNotesModule)},
  {path: 'othersart',
    loadChildren: () => import('./others-art/others-art.module').then(m => m.OthersArtModule)},
];

@NgModule({
  imports: [RouterModule.forChild(playgroundRoutes)],
  exports: [RouterModule]
})

export class PlaygroundRoutingModule { }
