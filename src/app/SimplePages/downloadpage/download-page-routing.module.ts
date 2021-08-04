import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

import { DownloadResolverService }    from './download-resolver.service';

import { DownloadPageComponent }      from './download-page/download-page.component';

const downloadRoutes: Routes = [
  { path: '', component: DownloadPageComponent,
    resolve: { DownloadResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(downloadRoutes)],
  exports: [RouterModule]
})

export class DownloadPageRoutingModule { }
