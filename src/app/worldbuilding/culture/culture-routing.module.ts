import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }     from 'src/app/GlobalServices/generalmemberresolver.service';

import { DetailsDisplayComponent }          from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/details-display/details-display.component';
import { NotFoundComponent }                from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component';

import { CulturemainComponent }             from './culturemain/culturemain.component';

const cultureRoutes: Routes = [
  { path: 'culture', component: CulturemainComponent,
    resolve: { GeneralcollectionresolverService },
    children: [
      { path: '', redirectTo: 'Zodiac', pathMatch: 'full' },
      { path: 'notfound', component: NotFoundComponent },
      { path: ':CultureID', component: DetailsDisplayComponent,
        resolve: { Ref: GeneralmemberresolverService } }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(cultureRoutes)],
  exports: [RouterModule]
})

export class CultureRoutingModule { }
