import { NgModule }                           from '@angular/core';
import { Routes, RouterModule }               from '@angular/router';

import { CharactersMainComponent }            from './charactersmain/charactersmain.component';
import { CharactersDetailsComponent }         from './charactersdetails/charactersdetails.component';
import { HomeComponent }                      from './home/home.component';
import { NotFoundComponent }                  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component'
import { GeneralcollectionresolverService }   from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }       from 'src/app/GlobalServices/generalmemberresolver.service';
import { CharactersBlowupmasterComponent } from './charactersblowupmaster/charactersblowupmaster.component';
import { CBUMResolverService } from './charactersblowupmaster/cbumresolver.service';

const characterRoutes: Routes = [
  {path: 'characters', component: CharactersMainComponent,
    resolve: { GeneralcollectionresolverService },
    children:[
      {path: '', component: HomeComponent },
      {path: 'notfound', component: NotFoundComponent },
      {path: ':CharaID', component: CharactersDetailsComponent,
        resolve: { Chara: GeneralmemberresolverService },
        children: [
          {path: ':RefID', component: CharactersBlowupmasterComponent,
            resolve: { links: CBUMResolverService } }
        ]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(characterRoutes)],
  exports: [RouterModule]
})

export class CharactersRoutingModule { }
