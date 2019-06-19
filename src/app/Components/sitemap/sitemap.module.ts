import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { SitemapRoutingModule } from './sitemap-routing.module';

import { SiteMapComponent }     from './sitemap/sitemap.component';
import { SharedModule }         from 'src/app/SharedComponents/shared.module';

@NgModule({
  declarations: [
    SiteMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SitemapRoutingModule
  ]
})

export class SitemapModule { }
