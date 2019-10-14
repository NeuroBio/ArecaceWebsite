import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNotesComponent } from './main-notes/main-notes.component';
import { NotFoundComponent } from 'src/app/SharedComponentModules/PrimaryContentDisplayer/ContentDisplay/notfound/notfound.component';
import { DetailsNotesComponent } from './details-notes/details-notes.component';
import { GeneralmemberresolverService } from 'src/app/GlobalServices/generalmemberresolver.service';
import { GeneralcollectionresolverService } from 'src/app/GlobalServices/generalcollectionresolver.service';

const noteRoutes: Routes = [
  {path: 'playground/notes', component: MainNotesComponent,
  resolve: {GeneralcollectionresolverService},
  children: [
    {path: '', redirectTo: 'Latest', pathMatch: 'full'},
    {path: 'notfound', component: NotFoundComponent},
    {path: ':NotesID', component: DetailsNotesComponent,
      resolve: {Note: GeneralmemberresolverService}}
  ]},
];;

@NgModule({
  imports: [RouterModule.forChild(noteRoutes)],
  exports: [RouterModule]
})
export class LooseNotesRoutingModule { }
