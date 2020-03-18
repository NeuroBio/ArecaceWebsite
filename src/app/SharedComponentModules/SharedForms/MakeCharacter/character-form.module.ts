import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterFormComponent }       from './characterform/characterform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadPreviewModule } from 'src/app/SharedComponentModules/SmallComponents/upload-preview/upload-preview.module';



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
