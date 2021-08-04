import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component';
import { ForumComponent } from './Forum/forum/forum.component';

const playgroundRoutes: Routes = [
  { path: '', component: PlaygroundhomeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'calc',
    loadChildren: () => import('./activities/CalcConvert/calc-convert.module').then(m => m.CalcConvertModule) },
  { path: 'nomadic',
    loadChildren: () => import('./nomadic/nomadic.module').then(m => m.NomadicModule) },
  { path: 'surveys',
    loadChildren: () => import('./activities/Surveys/survey.module').then(m => m.SurveyModule) },
  { path: 'notes',
    loadChildren: () => import('./LooseNotes/loose-notes.module').then(m => m.LooseNotesModule) },
  { path: 'othersart',
    loadChildren: () => import('./others-art/others-art.module').then(m => m.OthersArtModule) },
  { path: 'activities',
    loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(playgroundRoutes)],
  exports: [RouterModule]
})

export class PlaygroundRoutingModule { }
