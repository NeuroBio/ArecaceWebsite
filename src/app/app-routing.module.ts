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
    loadChildren: './comic-book/comicbook.module#ComicBookModule'},
  {path: 'dash',
    loadChildren: './UserDash/user-dash.module#UserDashModule'},
  {path: 'extras',
    loadChildren: './extras/extras.module#ExtrasModule'},
  {path: 'kArAAdministrativeUpload',
    loadChildren: './administration/administration.module#AdministrationModule'},
  {path: 'playground',
    loadChildren: './playground/playground.module#PlaygroundModule'},
  {path: 'story',
    loadChildren: './story/story.module#StoryModule'},
  {path: 'sitemap',
    loadChildren: './SimplePages/sitemap/sitemap.module#SitemapModule'},
  {path: 'world',
    loadChildren: './worldbuilding/worldbuilding.module#WorldbuildingModule'},
  
  //final catch
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'disabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
