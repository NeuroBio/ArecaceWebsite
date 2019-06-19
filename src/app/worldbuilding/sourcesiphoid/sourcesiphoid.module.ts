import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { SharedModule }                 from 'src/app/SharedComponents/shared.module';

import { SourceSiphoidRoutingModule }   from './sourcesiphoid-routing.module';

import { SourceSiphoidMainComponent }   from './sourcesiphoidmain/sourcesiphoidmain.component';

@NgModule({
  declarations: [
    SourceSiphoidMainComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SourceSiphoidRoutingModule
  ]
})

export class SourceSiphoidModule { }
