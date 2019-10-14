import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LooseNotesRoutingModule } from './loose-notes-routing.module';
import { MainNotesComponent } from './main-notes/main-notes.component';
import { DetailsNotesComponent } from './details-notes/details-notes.component';
import { PrimaryContentDisplayModule } from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

@NgModule({
  declarations: [
    MainNotesComponent,
    DetailsNotesComponent
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    LooseNotesRoutingModule
  ]
})
export class LooseNotesModule { }
