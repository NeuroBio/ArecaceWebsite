import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserdataMainResolverService } from './interactive-data/interact-home/userdata-main-resolver.service';
import { UserdataDetailsResolverService } from './interactive-data/interact-details-switch/userdata-details-resolver.service';

import { UserGuardGuard } from './user-guard.guard';

import { UserDashComponent } from './user-dash/user-dash.component';
import { InteractHomeComponent } from './interactive-data/interact-home/interact-home.component';
import { InteractDetailsSwitchComponent } from './interactive-data/interact-details-switch/interact-details-switch.component';
import { CBUMResolverService } from '../worldbuilding/characters/character-components/charactersblowupmaster/cbumresolver.service';
import { CharactersBlowupmasterComponent } from '../worldbuilding/characters/character-components/charactersblowupmaster/charactersblowupmaster.component';
import { UserInfoComponent } from './user-info/user-info.component';

const userRoutes: Routes = [
  { path: '', component: UserDashComponent },
  { path: 'settings', component: UserInfoComponent,
    canActivate: [UserGuardGuard] },

  // Survey Results
  { path: 'SurveyResults', component: InteractHomeComponent,
    canActivate: [UserGuardGuard],
    resolve: { UserdataMainResolverService },
    children: [
      { path: 'notfound', redirectTo: '' },
      { path: ':surveyID', component: InteractDetailsSwitchComponent,
        resolve: { Data: UserdataDetailsResolverService },
        children: [{ path: '**', redirectTo: '' }] }
  ]},

  // Source Affinity Calculations
  { path: 'SAcalculations', component: InteractHomeComponent,
    canActivate: [UserGuardGuard],
    resolve: { UserdataMainResolverService },
    children: [
      { path: 'notfound', redirectTo: '' },
      { path: ':SAcalcID', component: InteractDetailsSwitchComponent,
        resolve: { Data: UserdataDetailsResolverService } }
  ]},

  // Fan characters
  { path: 'FanCharacters/:CharaID/Download',
    loadChildren: () => import('src/app/SimplePages/downloadpage/download-page.module').then(m => m.DownloadPageModule)},
  { path: 'FanCharacters/:CharaID/:RefID/Download',
    loadChildren: () => import('src/app/SimplePages/downloadpage/download-page.module').then(m => m.DownloadPageModule)},

  { path: 'FanCharacters', component: InteractHomeComponent,
    canActivate: [UserGuardGuard],
    resolve: { UserdataMainResolverService },
    children: [
      { path: 'notfound', redirectTo: ''},
      { path: ':CharaID', component: InteractDetailsSwitchComponent,
        resolve: { Data: UserdataDetailsResolverService },
        children: [
          { path: ':RefID', component: CharactersBlowupmasterComponent,
            resolve: { links: CBUMResolverService } }
        ]}
  ]}


];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})

export class UserDashRoutingModule { }
