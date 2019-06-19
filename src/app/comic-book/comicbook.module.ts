import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { BookComponent }            from './book/book.component';
import { PageComponent }            from './page/page.component';

import { ComicBookRoutingModule }   from './comicbook-routing.module';

@NgModule({
  declarations: [
    BookComponent,
    PageComponent,
  ],
  imports: [
    CommonModule,
    ComicBookRoutingModule
  ]
})

export class ComicBookModule { }
