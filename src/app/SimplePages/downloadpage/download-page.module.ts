import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';

import { DownloadPageRoutingModule }    from './download-page-routing.module';
import { BookmarkModule }               from 'src/app/SharedComponentModules/SmallComponents/bookmark/bookmark.module'; 

import { DownloadPageComponent }        from './download-page/download-page.component';

@NgModule({
  declarations: [DownloadPageComponent],
  imports: [
    CommonModule,
    BookmarkModule,
    DownloadPageRoutingModule
  ]
})

export class DownloadPageModule { }
