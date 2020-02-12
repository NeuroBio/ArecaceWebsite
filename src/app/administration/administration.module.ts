import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { AdministrationRoutingModule }  from './administration-routing.module';
import { AdminComponent }               from './DashBoard/admin/admin.component';
import { ForbiddenComponent }           from './DashBoard/forbidden/forbidden.component';

import { ContentComponent }             from './DashBoard/content/content.component'
import { PickTypeComponent }            from './DashBoard/picktype/picktype.component';
import { LogoutComponent }              from './DashBoard/logout/logout.component';

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
import { PagesComponent } from './DashBoard/pages/pages.component';
import { WebsiteTextComponent } from './Forms/website-text/website-text.component';
import { AboutTextComponent } from './Forms/about-text/about-text.component';
import { FaqTextComponent } from './Forms/faq-text/faq-text.component';
import { IntroTextComponent } from './Forms/intro-text/intro-text.component';
import { SurveyComponent } from './Forms/survey/survey/survey.component';
import { SurveyStatsComponent } from './Forms/survey/survey-stats/survey-stats.component';
import { OthersArtFormComponent } from './Forms/othersart/othersartform/othersartform.component';
import { PixelformComponent } from './Forms/othersart/pixelform/pixelform.component';
import { SharedFormsModule } from '../SharedComponentModules/SharedForms/shared-forms.module';
import { SourceAffinityComponent } from './Forms/sourceaffinity/source-affinity/source-affinity.component';
import { LooseNotesFormComponent } from './Forms/loosenotes/loose-notes-form/loose-notes-form.component';
import { LanguageComponent } from './DashBoard/language/language.component';
import { GeneratorComponent } from './LanguageGeneration/generator/generator.component';
import { WordFormComponent } from './LanguageGeneration/word-form/word-form.component';
import { ComplexWordFormComponent } from './LanguageGeneration/complex-word-form/complex-word-form.component';
import { LanguageTableModule } from '../SharedComponentModules/language-table/language-table.module';
@NgModule({
  declarations: [
    AdminComponent,
    ForbiddenComponent,
    PickTypeComponent,
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
    PagesComponent,
    WebsiteTextComponent,
    AboutTextComponent,
    FaqTextComponent,
    IntroTextComponent,
    SurveyComponent,
    SurveyStatsComponent,
    OthersArtFormComponent,
    PixelformComponent,
    SourceAffinityComponent,
    LooseNotesFormComponent,
    LanguageComponent,
    GeneratorComponent,
    WordFormComponent,
    ComplexWordFormComponent
  ],
  imports: [
    CommonModule,
    SharedFormsModule,
    LanguageTableModule,
    ReactiveFormsModule,
    
    AdministrationRoutingModule
  ]
})

export class AdministrationModule { }
