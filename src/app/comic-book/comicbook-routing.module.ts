import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { BookComponent }            from './book/book.component'
import { PageComponent }            from './page/page.component';

import { BookResolverService }      from './book/bookresolver.service';
import { PageResolverService }      from './page/pageresolver.service';
import { LatestResolverService }    from './page/latestresolver.service';


const comicbookRoutes: Routes = [
  {path: 'comic', component: BookComponent,
  resolve: {BookResolverService},
  children: [
      {path: '', redirectTo: 'latest', pathMatch: 'prefix'},
      {path: "latest",  component: PageComponent,
          resolve: {pageLink: LatestResolverService}},
      {path: ":PageID",  component: PageComponent,
          resolve: {pageLink: PageResolverService}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(comicbookRoutes)],
  exports: [RouterModule]
})

export class ComicBookRoutingModule { }