import { BrowserModule }            from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER }                 from '@angular/core';
import { ReactiveFormsModule }      from '@angular/forms';

import { AngularFireModule }        from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule }   from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule }    from '@angular/fire/auth';
import { environment }              from '../environments/environment';

import { AppRoutingModule }         from './app-routing.module';

import { AdministrationModule }     from './administration/administration.module';
import { ComicBookModule }          from './comic-book/comicbook.module';
import { CultureModule }            from './worldbuilding/culture/culture.module';
import { ExtrasModule }             from './extras/extras.module';
import { PlaygroundModule }         from './playground/playground.module';
import { SitemapModule }            from './Components/sitemap/sitemap.module';
import { StoryModule }              from './story/story.module';
import { UpdatefeedModule }         from './Components/updatefeed/updatefeed.module';
import { WorldbuildingModule }      from './worldbuilding/worldbuilding.module';

import { AppComponent }             from './app.component';
import { AboutComponent }           from './Components/about/about.component';
import { BadserviceComponent }      from './Components/badservice/badservice.component';
import { ContactComponent }         from './Components/contact/contact.component';
import { FAQComponent }             from './Components/faq/faq.component';
import { CopyrightComponent }       from './Components/copyright/copyright.component';
import { HomeComponent }            from './Components/home/home.component';
import { LoginComponent }           from './Components/login/login.component';
import { PageNotFoundComponent }    from './Components/pagenotfound/pagenotfound.component';
import { TravelorsGuideComponent }  from './Components/travelorsguide/travelorsguide.component';
import { TextProvider } from './GlobalServices/textprovider.service';
import { AuthService } from './administration/security/Auth/auth.service';

export function TextFactory(provider: TextProvider) {
  return () => provider.load();
}

export function AuthFactory(provider: AuthService) {
  return () => provider.load();
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TravelorsGuideComponent,
    FAQComponent,
    CopyrightComponent,
    PageNotFoundComponent,
    BadserviceComponent,
    ContactComponent,
    LoginComponent,
    ],
  imports: [
    BrowserModule,
    WorldbuildingModule,
    ComicBookModule,
    AdministrationModule,
    StoryModule,
    PlaygroundModule,
    UpdatefeedModule,
    CultureModule,
    ExtrasModule,
    SitemapModule,

    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireFunctionsModule, //cloud functions

    AppRoutingModule,//this should always be LAST!!!

  ],
  providers: [AuthService,
              TextProvider,
              {provide: APP_INITIALIZER, useFactory: TextFactory,
              deps: [TextProvider], multi: true},
              {provide: APP_INITIALIZER, useFactory: AuthFactory,
                deps: [AuthService], multi: true}
            ],
  bootstrap: [AppComponent, ]
})

export class AppModule { }