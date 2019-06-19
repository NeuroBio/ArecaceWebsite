import { NgModule }                           from '@angular/core';
import { Routes, RouterModule }               from '@angular/router';

import { MapsMainComponent }                  from './mapsmain/mapsmain.component';
import { DetailsDisplayComponent }            from 'src/app/SharedComponents/details-display/details-display.component';
import { NotFoundComponent }                  from 'src/app/SharedComponents/notfound/notfound.component'

import { GeneralmemberresolverService }       from '../../GlobalServices/generalmemberresolver.service';
import { GeneralcollectionresolverService }   from '../../GlobalServices/generalcollectionresolver.service';

const mapRoutes: Routes = [
  {path: 'world/maps', component: MapsMainComponent,
    resolve: {GeneralcollectionresolverService},
    children: [
      {path: '', redirectTo: 'WorldMap', pathMatch: 'full'},
      {path: 'notfound', component:NotFoundComponent},
      {path: ':MapID', component: DetailsDisplayComponent,
        resolve: {Ref: GeneralmemberresolverService}}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(mapRoutes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
