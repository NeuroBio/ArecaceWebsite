import { NgModule }                           from '@angular/core';
import { Routes, RouterModule }               from '@angular/router';

import { CharactersMainComponent }            from './character-components/charactersmain/charactersmain.component';
import { CharactersDetailsComponent }         from './character-components/charactersdetails/charactersdetails.component';
import { HomeComponent }                      from './home/home.component';
import { NotFoundComponent }                  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component'
import { CharactersBlowupmasterComponent }    from './character-components/charactersblowupmaster/charactersblowupmaster.component';

import { GeneralcollectionresolverService }   from 'src/app/GlobalServices/generalcollectionresolver.service';
import { GeneralmemberresolverService }       from 'src/app/GlobalServices/generalmemberresolver.service';
import { CBUMResolverService }                from './character-components/charactersblowupmaster/cbumresolver.service';

const characterRoutes: Routes = [
  {path: 'characters/:CharaID/Download',
    loadChildren: () => import('src/app/SimplePages/downloadpage/download-page.module').then(m => m.DownloadPageModule)},
  
  {path: 'characters/:CharaID/:RefID/Download',
    loadChildren: () => import('src/app/SimplePages/downloadpage/download-page.module').then(m => m.DownloadPageModule)},

  {path: 'characters', component: CharactersMainComponent,
    resolve: { GeneralcollectionresolverService },
    children: [
      {path: '', component: HomeComponent },
      {path: 'notfound', component: NotFoundComponent },
      {path: ':CharaID', component: CharactersDetailsComponent,
        resolve: { Data: GeneralmemberresolverService },
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
