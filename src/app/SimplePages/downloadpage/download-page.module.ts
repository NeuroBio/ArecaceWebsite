import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadPageComponent } from './download-page/download-page.component';
import { DownloadPageRoutingModule } from './download-page-routing.module';
import { BookmarkModule } from 'src/app/SharedComponentModules/bookmark/bookmark.module'; 

@NgModule({
  declarations: [DownloadPageComponent],
  imports: [
    CommonModule,
    BookmarkModule,
    DownloadPageRoutingModule
  ]
})

export class DownloadPageModule { }
