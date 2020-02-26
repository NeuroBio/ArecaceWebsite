import { NgModule }                           from '@angular/core';
import { Routes, RouterModule }               from '@angular/router';

//import { NotFoundComponent }                  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component'
import { GeneralcollectionresolverService }   from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }       from 'src/app/GlobalServices/generalmemberresolver.service';
import { SurveyMainComponent }                from './survey-components/survey-main/survey-main.component';
import { SurveyPartsComponent }               from './survey-components/survey-parts/survey-parts.component';

const surveyRoutes: Routes = [
  {path: '', component: SurveyMainComponent,
  resolve: { GeneralcollectionresolverService },
  children:[
      {path: '', redirectTo: 'Guild', pathMatch: 'full'},
      {path: ':SurveyID', component: SurveyPartsComponent,//SurveyDetailsComponent,
         resolve: { Survey: GeneralmemberresolverService }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(surveyRoutes)],
  exports: [RouterModule]
})

export class SurveyRoutingModule { }
