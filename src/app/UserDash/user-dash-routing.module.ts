import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { UserDashComponent } from './user-dash/user-dash.component';
import { InteractHomeComponent } from './interactive-data/interact-home/interact-home.component';
import { ViewDetailsComponent } from './interactive-data/view-details/view-details.component';
import { AuthResolverService } from './interactive-data/auth-resolver.service';
import { GeneralmemberresolverService } from 'src/app/GlobalServices/generalmemberresolver.service';

const userRoutes: Routes = [
  {path: '', component: UserDashComponent},
  {path: 'SurveyResults', component: InteractHomeComponent,
    resolve: { AuthResolverService },
    children: [
      {path: '', redirectTo: 'notfound'},
      {path: 'notfound', redirectTo: ''},
      {path: ':surveyID', component: ViewDetailsComponent,
        resolve: {UserData: GeneralmemberresolverService}}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserDashRoutingModule { }
