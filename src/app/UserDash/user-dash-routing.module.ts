import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { UserDashComponent } from './user-dash/user-dash.component';
import { ResultsComponent } from '../playground/surveys/survey-components/results/results.component';

const userRoutes:Routes = [
  {path: '', component: UserDashComponent,
children: [
  //{path: 'survey', component: ResultsComponent}
]},

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserDashRoutingModule { }
