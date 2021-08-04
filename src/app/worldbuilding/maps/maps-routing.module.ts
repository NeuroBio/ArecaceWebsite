import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralmemberresolverService } from '../../GlobalServices/generalmemberresolver.service';
import { GeneralcollectionresolverService } from '../../GlobalServices/generalcollectionresolver.service';

import { MapsMainComponent } from './mapsmain/mapsmain.component';
import { DetailsDisplayComponent } from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/details-display/details-display.component';
import { NotFoundComponent } from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component';

const mapRoutes: Routes = [
  { path: 'maps', component: MapsMainComponent,
    resolve: {GeneralcollectionresolverService },
    children: [
      { path: '', redirectTo: 'WorldMap', pathMatch: 'full' },
      { path: 'notfound', component: NotFoundComponent },
      { path: ':MapID', component: DetailsDisplayComponent,
        resolve: { Ref: GeneralmemberresolverService } }
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(mapRoutes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
