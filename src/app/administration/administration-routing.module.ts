import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { AuthGuard }                from './security/Auth/auth.guard'

import { AdminComponent }           from './DashBoard/admin/admin.component';
import { ForbiddenComponent }       from './DashBoard/forbidden/forbidden.component';
import { ContentComponent }         from './DashBoard/content/content.component';

import { CharacterFormComponent }   from './Forms/character/characterform/characterform.component';
import { BeastFormComponent }       from './Forms/beast/beastform/beastform.component';
import { ChapterFormComponent }     from './Forms/chapter/chapterform/chapterform.component'
import { StoryFormComponent}        from './Forms/story/storyform/storyform.component';
import { GuildFormComponent }       from './Forms/guild/guildform/guildform.component';
import { ReferenceFormComponent }   from './Forms/reference/referenceform/referenceform.component';
import { UpdateFormComponent }      from './Forms/update/update-form/update-form.component'
import { ExtrasFormComponent }      from './Forms/extras/extrasform/extrasform.component';
import { AdminDutiesComponent }     from './DashBoard/adminDuties/adminDuties.component';
import { MessageComponent }         from './DashBoard/message/message.component';
import { PagesComponent } from './DashBoard/pages/pages.component';

import { MessageresolverService } from './DashBoard/message/messageresolver.service';
import { WebsiteTextComponent } from './Forms/website-text/website-text.component';


const AdminRoutes: Routes = [
  {path: 'kArAAdministrativeUpload', component: AdminComponent,
    children:[
      {path: '', component: ForbiddenComponent},
      {path: 'Dash', component: AdminDutiesComponent, 
      canActivate: [AuthGuard],
      children:[
        {path: 'Content', component:ContentComponent, 
        children:[
          {path: '', redirectTo: 'characters', pathMatch: 'full'},
          {path: 'characters', component: CharacterFormComponent },
          {path: 'bestiary', component: BeastFormComponent },
          {path: 'arc1', component: ChapterFormComponent },
          {path: 'arc2', component: ChapterFormComponent },
          {path: 'narratives', component: StoryFormComponent},
          {path: 'scripts', component: StoryFormComponent},
          {path: 'guilds', component: GuildFormComponent},
          {path: 'source', component: ReferenceFormComponent},
          {path: 'update', component: UpdateFormComponent},
          {path: 'culture', component: ReferenceFormComponent},
          {path: 'extras', component: ExtrasFormComponent},
          {path: 'maps', component: ReferenceFormComponent},
        ]},
        {path: 'Pages', component:PagesComponent, 
         children:[
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'home', component: WebsiteTextComponent },
          {path: 'about', component: WebsiteTextComponent },
          {path: 'travelersguide', component: WebsiteTextComponent },
          {path: 'faq', component: WebsiteTextComponent },
          {path: 'copyright', component: WebsiteTextComponent },
          {path: 'intro', component: WebsiteTextComponent },
          {path: 'login', component: WebsiteTextComponent },
         ]
      },
        {path:'Messages', component: MessageComponent,
          resolve: {MessageresolverService}}
      ]
  },
]}
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
