import { NgModule }                       from '@angular/core';
import { Routes, RouterModule }           from '@angular/router';

import { UserdataMainResolverService }    from './interactive-data/interact-home/userdata-main-resolver.service';
import { GeneralmemberresolverService }   from 'src/app/GlobalServices/generalmemberresolver.service';
import { UserdataDetailsResolverService } from './interactive-data/interact-details-switch/userdata-details-resolver.service'
import { UserGuardGuard }                 from './user-guard.guard';

import { UserDashComponent }              from './user-dash/user-dash.component';
import { InteractHomeComponent }          from './interactive-data/interact-home/interact-home.component';
import { InteractDetailsSwitchComponent } from './interactive-data/interact-details-switch/interact-details-switch.component';

const userRoutes: Routes = [
  {path: '', component: UserDashComponent,},
  {path: 'SurveyResults', component: InteractHomeComponent,
  canActivate: [UserGuardGuard],
  resolve: { UserdataMainResolverService },
    children: [
      {path: 'notfound', redirectTo: ''},
      {path: ':surveyID', component: InteractDetailsSwitchComponent,
        resolve: {Data: UserdataDetailsResolverService},
      children: [{path: '**', redirectTo: ''}]}
  ]},


  {path: 'SAcalculations', component: InteractHomeComponent,
  canActivate: [UserGuardGuard],
  resolve: { UserdataMainResolverService },
    children: [
      {path: 'notfound', redirectTo: ''},
      {path: ':SAcalcID', component: InteractDetailsSwitchComponent,
        resolve: {Data: UserdataDetailsResolverService}}
  ]},

  
  {path: 'FanCharacters', component: InteractHomeComponent,
  canActivate: [UserGuardGuard],
  resolve: { UserdataMainResolverService },
    children: [
      {path: 'notfound', redirectTo: ''},
      {path: ':CharaID', component: InteractDetailsSwitchComponent,
        resolve: {Data: UserdataDetailsResolverService}}
  ]}


];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserDashRoutingModule { }
