import { NgModule }                           from '@angular/core';
import { Routes, RouterModule }               from '@angular/router';

import { SourceSiphoidMainComponent }         from './sourcesiphoidmain/sourcesiphoidmain.component';
import { NotFoundComponent }                  from 'src/app/SharedComponents/notfound/notfound.component'


import { DetailsDisplayComponent }            from 'src/app/SharedComponents/details-display/details-display.component';

import { GeneralcollectionresolverService }   from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }       from 'src/app/GlobalServices/generalmemberresolver.service';

const sourcesiphRoutes: Routes = [
  {path: 'world/source', component: SourceSiphoidMainComponent,
    resolve: {GeneralcollectionresolverService},
    children:[
      {path: '', redirectTo: 'SourceandSiphoid', pathMatch: "full"},
      {path: 'notfound', component:NotFoundComponent },
      {path: ':SourceID', component:DetailsDisplayComponent,
        resolve: {Ref: GeneralmemberresolverService}},
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(sourcesiphRoutes)],
  exports: [RouterModule]
})

export class SourceSiphoidRoutingModule { }
