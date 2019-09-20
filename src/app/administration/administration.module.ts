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
import { SourceFormComponent }          from './Forms/source/sourceform/sourceform.component';
import { UpdateFormComponent }          from './Forms/Update/update-form/update-form.component';
import { MiscFormComponent }            from './Forms/misc/miscform/miscform.component';
import { AdminDutiesComponent }         from './DashBoard/adminDuties/adminDuties.component';
import { MessageComponent }             from './DashBoard/message/message.component';
import { ButtonsComponent }             from './Forms/buttons/buttons.component'

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
    SourceFormComponent,
    UpdateFormComponent,
    MiscFormComponent,
    AdminDutiesComponent,
    MessageComponent,
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
