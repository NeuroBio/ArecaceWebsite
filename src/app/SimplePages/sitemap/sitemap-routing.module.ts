import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { SiteMapComponent }       from './sitemap/sitemap.component';

const sitemapRoutes: Routes = [
  {path: 'sitemap', component: SiteMapComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(sitemapRoutes)],
  exports: [RouterModule]
})

export class SitemapRoutingModule { }
