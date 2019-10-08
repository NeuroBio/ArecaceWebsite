import { NgModule }                           from '@angular/core';
import { Routes, RouterModule }               from '@angular/router';

import { NotFoundComponent }                  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component'
import { GeneralcollectionresolverService }   from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }       from 'src/app/GlobalServices/generalmemberresolver.service';
import { SurveyMainComponent } from './survey-main/survey-main.component';
import { SurveyPartsComponent } from './survey-parts/survey-parts.component';

const surveyRoutes: Routes = [
  {path: "playground/surveys", component: SurveyMainComponent,
  resolve: { GeneralcollectionresolverService },
  children:[
      {path: '', redirectTo: 'Guild', pathMatch: 'full'},
      {path: ':SurveyID', component: SurveyPartsComponent,//SurveyDetailsComponent,
         resolve: { Survey: GeneralmemberresolverService }}
  ]}
  // {path: 'world/characters', component: CharactersMainComponent,
  //   resolve: { GeneralcollectionresolverService },
  //   children:[
  //     {path: '', component: HomeComponent },
  //     {path: 'notfound', component: NotFoundComponent },
  //     {path: ':CharaID', component: CharactersDetailsComponent,
  //       resolve: { Chara: GeneralmemberresolverService },
  //       children: [
  //         {path: ':RefID', component: CharactersBlowupmasterComponent,
  //           resolve: { links: CBUMResolverService } }
  //       ]}
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(surveyRoutes)],
  exports: [RouterModule]
})

export class SurveyRoutingModule { }
