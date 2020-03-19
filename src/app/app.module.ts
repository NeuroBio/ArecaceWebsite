import { BrowserModule }              from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER }  from '@angular/core';
import { ReactiveFormsModule }        from '@angular/forms';
import { HttpClientModule }           from '@angular/common/http';


import { AngularFireModule }          from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule }     from '@angular/fire/firestore';
import { AngularFireStorageModule }   from '@angular/fire/storage';
import { AngularFireAuthModule }      from '@angular/fire/auth';
import { environment }                from '../environments/environment';

import { AppRoutingModule }           from './app-routing.module';
import { UpdatefeedModule }           from './SharedComponentModules/UpdateFeed/updatefeed.module';
import { ShowNewestModule }           from './SharedComponentModules/ShowNewest/show-newest.module';
import { ScrollFrameModule }          from './SharedComponentModules/SmallComponents/scroll-frame/scroll-frame.module';

import { AppComponent }               from './app.component';
import { AboutComponent }             from './SimplePages/about/about.component';
import { BadserviceComponent }        from './SimplePages/badservice/badservice.component';
import { ContactComponent }           from './SimplePages/contact/contact.component';
import { CopyrightComponent }         from './SimplePages/copyright/copyright.component';
import { FAQComponent }               from './SimplePages/faq/faq.component';
import { HomeComponent }              from './SimplePages/home/home.component';
import { PageNotFoundComponent }      from './SimplePages/pagenotfound/pagenotfound.component';
import { TravelorsGuideComponent }    from './SimplePages/travelorsguide/travelorsguide.component';
import { UploadLogComponent }         from './SimplePages/upload-log/upload-log.component';

import { AuthService }                from './administration/security/Auth/auth.service';
import { TextProvider }               from './GlobalServices/textprovider.service';


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
    UploadLogComponent
    ],

  imports: [
    BrowserModule,
    HttpClientModule,
    UpdatefeedModule,
    ShowNewestModule,
    ScrollFrameModule,
    
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

  bootstrap: [AppComponent]
})

export class AppModule { }