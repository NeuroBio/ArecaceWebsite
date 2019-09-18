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
import { SourceFormComponent }      from './Forms/source/sourceform/sourceform.component';
import { UpdateFormComponent }      from './Forms/Update/update-form/update-form.component'
import { MiscFormComponent }        from './Forms/misc/miscform/miscform.component';
import { AdminDutiesComponent }        from './DashBoard/adminDuties/adminDuties.component';
import { MessageComponent }         from './DashBoard/message/message.component';

import { MessageresolverService } from './DashBoard/message/messageresolver.service';


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
          {path: 'chapter', component: ChapterFormComponent },
          {path: 'story', component: StoryFormComponent},
          {path: 'guilds', component: GuildFormComponent},
          {path: 'source', component: SourceFormComponent},
          {path: 'update', component: UpdateFormComponent},
          {path: 'culture', component: SourceFormComponent},
          {path: 'extras', component: MiscFormComponent},
          {path: 'maps', component: SourceFormComponent},
        ]},
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
