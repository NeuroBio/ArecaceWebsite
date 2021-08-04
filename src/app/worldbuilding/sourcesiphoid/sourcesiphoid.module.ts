import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { SourceSiphoidRoutingModule }   from './sourcesiphoid-routing.module';
import { PrimaryContentDisplayModule }  from 'src/app/SharedComponentModules/PrimaryContentDisplayer/primary-content-display.module';

import { SourceSiphoidMainComponent }   from './sourcesiphoidmain/sourcesiphoidmain.component';

@NgModule({
  declarations: [
    SourceSiphoidMainComponent,
  ],
  imports: [
    CommonModule,
    PrimaryContentDisplayModule,
    SourceSiphoidRoutingModule
  ]
})

export class SourceSiphoidModule { }
