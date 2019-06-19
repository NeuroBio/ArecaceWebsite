import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { CulturemainComponent }             from './culturemain/culturemain.component';
import { DetailsDisplayComponent }          from 'src/app/SharedComponents/details-display/details-display.component';
import { NotFoundComponent }                from 'src/app/SharedComponents/notfound/notfound.component'

import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }     from 'src/app/GlobalServices/generalmemberresolver.service';

const cultureRoutes: Routes = [
  {path: 'world/culture', component: CulturemainComponent,
    resolve: {GeneralcollectionresolverService},
    children:[
      {path: '', redirectTo: 'Zodiac', pathMatch: 'full'},
      {path: 'notfound', component: NotFoundComponent},
      {path: ':CultureID', component: DetailsDisplayComponent,
        resolve: {Ref: GeneralmemberresolverService}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(cultureRoutes)],
  exports: [RouterModule]
})

export class CultureRoutingModule { }
