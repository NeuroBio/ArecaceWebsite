import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { SitemapRoutingModule } from './sitemap-routing.module';

import { SiteMapComponent }     from './sitemap/sitemap.component';
import { LinkListModule } from 'src/app/SharedComponentModules/PrimaryContentDisplayer/LinkListDisplay/linklist.module';

@NgModule({
  declarations: [
    SiteMapComponent
  ],
  imports: [
    CommonModule,
    LinkListModule,
    SitemapRoutingModule
  ]
})

export class SitemapModule { }
