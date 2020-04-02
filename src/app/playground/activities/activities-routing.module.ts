import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { TogglerModule } from 'src/app/SharedComponentModules/SmallComponents/toggler/toggler.module';

import { ActivitieshomeComponent }  from './activitieshome/activitieshome.component';
import { FanCharactersComponent }   from './fan-characters/fan-characters.component';


const activeRoutes: Routes = [
  { path: '', component: ActivitieshomeComponent,
    children: [
      { path: 'makefancharacter', component: FanCharactersComponent },
      { path: 'calc',
        loadChildren: () => import('./CalcConvert/calc-convert.module').then(m => m.CalcConvertModule) },
      { path: 'surveys',
        loadChildren: () => import('./Surveys/survey.module').then(m => m.SurveyModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(activeRoutes)],
  exports: [
    TogglerModule,
    RouterModule
  ]
})

export class ActivitiesRoutingModule { }
