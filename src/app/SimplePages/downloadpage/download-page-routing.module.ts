import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { DownloadPageComponent }       from './download-page/download-page.component';
import { DownloadResolverService } from './download-resolver.service';

const downloadRoutes: Routes = [
  {path: '', component: DownloadPageComponent,
    resolve: { DownloadResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(downloadRoutes)],
  exports: [RouterModule]
})

export class DownloadPageRoutingModule { }
