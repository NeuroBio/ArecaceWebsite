import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { UserDashComponent } from './user-dash/user-dash.component';
import { InteractHomeComponent } from './interactive-data/interact-home/interact-home.component';
import { InteractDetailsSwitchComponent } from './interactive-data/interact-details-switch/interact-details-switch.component';
import { AuthResolverService } from './interactive-data/auth-resolver.service';
import { GeneralmemberresolverService } from 'src/app/GlobalServices/generalmemberresolver.service';
import { UserGuardGuard } from './user-guard.guard';

const userRoutes: Routes = [
  {path: '', component: UserDashComponent,},
  {path: 'SurveyResults', component: InteractHomeComponent,
  canActivate: [UserGuardGuard],
  resolve: { AuthResolverService },
    children: [
      {path: '', redirectTo: 'notfound'},
      {path: 'notfound', redirectTo: ''},
      {path: ':surveyID', component: InteractDetailsSwitchComponent,
        resolve: {UserData: GeneralmemberresolverService}}
    ]
  },
  {path: 'SAcalculations', component: InteractHomeComponent,
  canActivate: [UserGuardGuard],
  resolve: { AuthResolverService },
    children: [
      {path: '', redirectTo: 'notfound'},
      {path: 'notfound', redirectTo: ''},
      {path: ':SAcalcID', component: InteractDetailsSwitchComponent,
        resolve: {UserData: GeneralmemberresolverService}}
    ]
  },
  {path: 'FanCharacters', component: InteractHomeComponent,
  canActivate: [UserGuardGuard],
  resolve: { AuthResolverService },
    children: [
      {path: '', redirectTo: 'notfound'},
      {path: 'notfound', redirectTo: ''},
      {path: ':CharaID', component: InteractDetailsSwitchComponent,
        resolve: {Chara: GeneralmemberresolverService}}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserDashRoutingModule { }
