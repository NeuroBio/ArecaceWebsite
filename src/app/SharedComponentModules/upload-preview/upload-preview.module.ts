import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';

@NgModule({
  declarations: [
    UploadPreviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploadPreviewComponent
  ]
})

export class UploadPreviewModule {}
