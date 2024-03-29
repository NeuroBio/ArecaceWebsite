import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AuthGuard }                from './security/Auth/auth.guard'
import { MessageresolverService }   from './DashBoard/message/messageresolver.service';

import { AboutTextComponent }       from './Forms/about-text/about-text.component';
import { AdminComponent }           from './DashBoard/admin/admin.component';
import { AdminDutiesComponent }     from './DashBoard/adminDuties/adminDuties.component';
import { BeastFormComponent }       from './Forms/beast/beastform/beastform.component';
import { ChapterFormComponent }     from './Forms/chapter/chapterform/chapterform.component'
import { CharacterComponent }       from './Forms/character/characterform/character.component';
import { ContentComponent }         from './DashBoard/content/content.component';
import { ExtrasFormComponent }      from './Forms/extras/extrasform/extrasform.component';
import { FaqTextComponent }         from './Forms/faq-text/faq-text.component';
import { ForbiddenComponent }       from './DashBoard/forbidden/forbidden.component';
import { GuildFormComponent }       from './Forms/guild/guildform/guildform.component';
import { IntroTextComponent }       from './Forms/intro-text/intro-text.component';
import { LanguageComponent }        from './DashBoard/language/language.component';
import { LooseNotesFormComponent }  from './Forms/loosenotes/loose-notes-form/loose-notes-form.component';
import { MessageComponent }         from './DashBoard/message/message.component';
import { OthersArtFormComponent }   from './Forms/othersart/othersartform/othersartform.component';
import { PagesComponent }           from './DashBoard/pages/pages.component';
import { PixelformComponent }       from './Forms/othersart/pixelform/pixelform.component';
import { ReferenceFormComponent }   from './Forms/reference/referenceform/referenceform.component';
import { SourceAffinityComponent }  from './Forms/sourceaffinity/source-affinity/source-affinity.component';
import { StoryFormComponent}        from './Forms/story/storyform/storyform.component';
import { SurveyComponent }          from './Forms/survey/survey/survey.component';
import { SurveyStatsComponent }     from './Forms/survey/survey-stats/survey-stats.component';
import { UpdateFormComponent }      from './Forms/update/update-form/update-form.component'
import { WebsiteTextComponent }     from './Forms/website-text/website-text.component';



const AdminRoutes: Routes = [
  {path: '', component: AdminComponent,
    children: [
      {path: '', component: ForbiddenComponent},
      {path: 'Dash', component: AdminDutiesComponent, 
      canActivate: [AuthGuard],
      children: [
        {path: 'Content', component:ContentComponent, 
        children: [
          { path: '', redirectTo: 'characters', pathMatch: 'full'},
          { path: 'characters', component: CharacterComponent },
          { path: 'bestiary', component: BeastFormComponent },
          { path: 'arc1', component: ChapterFormComponent },
          { path: 'arc2', component: ChapterFormComponent },
          { path: 'narratives', component: StoryFormComponent },
          { path: 'scripts', component: StoryFormComponent },
          { path: 'guilds', component: GuildFormComponent },
          { path: 'source', component: ReferenceFormComponent },
          { path: 'update', component: UpdateFormComponent },
          { path: 'culture', component: ReferenceFormComponent },
          { path: 'extras', component: ExtrasFormComponent },
          { path: 'maps', component: ReferenceFormComponent },
          { path: 'surveys', component: SurveyComponent },
          { path: 'surveystats', component: SurveyStatsComponent },
          { path: 'othersart', component: OthersArtFormComponent },
          { path: 'pixels', component: PixelformComponent },
          { path: 'sourceaffinity', component: SourceAffinityComponent},
          { path: 'notes', component: LooseNotesFormComponent}
        ]},
        {path: 'Pages', component:PagesComponent, 
        children: [
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'home', component: WebsiteTextComponent },
          {path: 'about', component: AboutTextComponent },
          {path: 'travelersguide', component: WebsiteTextComponent },
          {path: 'faq', component: FaqTextComponent },
          {path: 'copyright', component: WebsiteTextComponent },
          {path: 'intro', component: IntroTextComponent },
          {path: 'login', component: WebsiteTextComponent },
          {path: 'userdash', component: WebsiteTextComponent },
          {path: 'comic', component: WebsiteTextComponent },
          {path: 'nomadicintro', component: WebsiteTextComponent },
          {path: 'nomadicsyntax', component: WebsiteTextComponent },
          {path: 'datapolicy', component: WebsiteTextComponent},
          {path: 'accessibility', component: WebsiteTextComponent}
         ]
      },
      {path: 'Nomadic', component: LanguageComponent},
      {path:'Messages', component: MessageComponent,
        resolve: {MessageresolverService}}
      ]
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})

export class AdministrationRoutingModule { }
