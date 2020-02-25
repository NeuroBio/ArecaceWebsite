import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AboutComponent }           from './SimplePages/about/about.component';
import { BadserviceComponent }      from './SimplePages/badservice/badservice.component';
import { ContactComponent }         from './SimplePages/contact/contact.component';
import { CopyrightComponent }       from './SimplePages/copyright/copyright.component';
import { FAQComponent }             from './SimplePages/faq/faq.component';
import { HomeComponent }            from './SimplePages/home/home.component';
import { PageNotFoundComponent }    from './SimplePages/pagenotfound/pagenotfound.component';
import { TravelorsGuideComponent }  from './SimplePages/travelorsguide/travelorsguide.component';

const routes: Routes = [
  //simple pages
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'badservice', component: BadserviceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'faq', component: FAQComponent},
  {path: 'faq/copyright', component: CopyrightComponent},
  {path: 'guide', component: TravelorsGuideComponent},
  {path: 'home', component: HomeComponent}, 

  //modules
  {path: 'comic',
    loadChildren: () => import('./comic-book/comicbook.module').then(m => m.ComicBookModule)},
  {path: 'dash',
    loadChildren: () => import('./UserDash/user-dash.module').then(m => m.UserDashModule)},
  {path: 'extras',
    loadChildren: () => import('./extras/extras.module').then(m => m.ExtrasModule)},
  {path: 'kArAAdministrativeUpload',
    loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)},
  {path: 'playground',
    loadChildren: () => import('./playground/playground.module').then(m => m.PlaygroundModule)},
  {path: 'story',
    loadChildren: () => import('./story/story.module').then(m => m.StoryModule)},
  {path: 'sitemap',
    loadChildren: () => import('./SimplePages/sitemap/sitemap.module').then(m => m.SitemapModule)},
  {path: 'world',
    loadChildren: () => import('./worldbuilding/worldbuilding.module').then(m => m.WorldbuildingModule)},

  //final catch
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'disabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
