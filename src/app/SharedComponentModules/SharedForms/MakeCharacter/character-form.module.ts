import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';

import { UploadPreviewModule }      from 'src/app/SharedComponentModules/SmallComponents/upload-preview/upload-preview.module';

import { CharacterFormComponent }   from './characterform/characterform.component';



@NgModule({
  declarations: [
    CharacterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UploadPreviewModule
  ],
  exports: [
    CharacterFormComponent
  ]
})
export class CharacterFormModule { }
