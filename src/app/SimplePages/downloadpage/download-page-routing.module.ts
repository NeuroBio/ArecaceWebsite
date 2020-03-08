import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { DownloadPageComponent }       from './download-page/download-page.component';

const downloadRoutes: Routes = [
  {path: '', component: DownloadPageComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(downloadRoutes)],
  exports: [RouterModule]
})

export class DownloadPageRoutingModule { }
