import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComicBookRoutingModule } from './comicbook-routing.module';
import { BookmarkModule } from '../SharedComponentModules/SmallComponents/bookmark/bookmark.module';

import { BookComponent } from './book/book.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    BookComponent,
    PageComponent,
  ],
  imports: [
    CommonModule,
    BookmarkModule,
    ComicBookRoutingModule
  ]
})

export class ComicBookModule { }
