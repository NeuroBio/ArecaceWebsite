import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';
import { UploadMainComponent }    from './upload-main/upload-main.component';

@NgModule({
  declarations: [
    UploadPreviewComponent,
    UploadMainComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploadPreviewComponent,
    UploadMainComponent
  ]
})

export class UploadPreviewModule {}
