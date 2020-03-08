import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadPageComponent } from './download-page/download-page.component';
import { DownloadPageRoutingModule } from './download-page-routing.module';


@NgModule({
  declarations: [DownloadPageComponent],
  imports: [
    CommonModule,
    DownloadPageRoutingModule
  ]
})

export class DownloadPageModule { }
