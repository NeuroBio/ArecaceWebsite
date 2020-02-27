import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { UserDashComponent } from './user-dash/user-dash.component';
import { ViewHomeComponent } from './interactive-data/view-home/view-home.component';
import { ResultsComponent } from 'src/app/playground/surveys/survey-components/results/results.component';

import { AuthResolverService } from './interactive-data/auth-resolver.service';
import { GeneralmemberresolverService } from 'src/app/GlobalServices/generalmemberresolver.service';

const userRoutes: Routes = [
  {path: '', component: UserDashComponent},
  {path: 'SurveyResults', component: ViewHomeComponent,
    resolve: { AuthResolverService },
    children: [
      {path: '', redirectTo: 'notfound'},
      {path: 'notfound', redirectTo: ''},
      {path: ':surveyID', component: ResultsComponent,
        resolve: {Survey: GeneralmemberresolverService}}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserDashRoutingModule { }
