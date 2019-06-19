import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AboutComponent }           from './Components/about/about.component';
import { BadserviceComponent }      from './Components/badservice/badservice.component';
import { ContactComponent }         from './Components/contact/contact.component';
import { CopyrightComponent }       from './Components/copyright/copyright.component';
import { FAQComponent }             from './Components/faq/faq.component';
import { HomeComponent }            from './Components/home/home.component';
import { LoginComponent }           from './Components/login/login.component';
import { PageNotFoundComponent }    from './Components/pagenotfound/pagenotfound.component';
import { TravelorsGuideComponent }  from './Components/travelorsguide/travelorsguide.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'badservice', component: BadserviceComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'faq', component: FAQComponent},
  {path: 'faq/copyright', component: CopyrightComponent},
  {path: 'guide', component: TravelorsGuideComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent}, 
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'disabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
