import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { AdministrationRoutingModule }  from './administration-routing.module';
import { AdminComponent }               from './DashBoard/admin/admin.component';
import { ForbiddenComponent }           from './DashBoard/forbidden/forbidden.component';

import { ContentComponent }             from './DashBoard/content/content.component'
import { PickTypeComponent }            from './DashBoard/picktype/picktype.component';
import { LogoutComponent }              from './DashBoard/logout/logout.component';

import { CharacterFormComponent }       from './Forms/character/characterform/characterform.component';
import { BeastFormComponent }           from './Forms/beast/beastform/beastform.component';
import { ChapterFormComponent }         from './Forms/chapter/chapterform/chapterform.component';
import { StoryFormComponent }           from './Forms/story/storyform/storyform.component';
import { GuildFormComponent }           from './Forms/guild/guildform/guildform.component';
import { EditListComponent }            from './DashBoard/editlist/editlist.component';
import { ReferenceFormComponent }          from './Forms/reference/referenceform/referenceform.component';
import { UpdateFormComponent }          from './Forms/update/update-form/update-form.component';
import { ExtrasFormComponent }            from './Forms/extras/extrasform/extrasform.component';
import { AdminDutiesComponent }         from './DashBoard/adminDuties/adminDuties.component';
import { MessageComponent }             from './DashBoard/message/message.component';
import { ButtonsComponent }             from './Forms/z-buttons/upload-content/buttons.component';
import { PagesComponent } from './DashBoard/pages/pages.component';
import { WebsiteTextComponent } from './Forms/website-text/website-text.component';
import { PageSubmitComponent } from './Forms/z-buttons/page-submit/page-submit.component';
import { AboutTextComponent } from './Forms/about-text/about-text.component';
import { FaqTextComponent } from './Forms/faq-text/faq-text.component';
import { IntroTextComponent } from './Forms/intro-text/intro-text.component';

@NgModule({
  declarations: [
    AdminComponent,
    ForbiddenComponent,
    PickTypeComponent,
    CharacterFormComponent,
    BeastFormComponent,
    ChapterFormComponent,
    StoryFormComponent,
    GuildFormComponent,
    ContentComponent,
    LogoutComponent,
    EditListComponent,
    ReferenceFormComponent,
    UpdateFormComponent,
    ExtrasFormComponent,
    AdminDutiesComponent,
    MessageComponent,
    ButtonsComponent,
    PagesComponent,
    WebsiteTextComponent,
    PageSubmitComponent,
    AboutTextComponent,
    FaqTextComponent,
    IntroTextComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    AdministrationRoutingModule
  ]
})

export class AdministrationModule { }
