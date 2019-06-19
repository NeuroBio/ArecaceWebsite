import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { AdministrationRoutingModule }  from './administration-routing.module';
import { AdminComponent }               from './admin/admin.component';
import { ForbiddenComponent }               from './forbidden/forbidden.component';

import { ContentComponent }                from './dash/content/content.component'
import { PickTypeComponent }            from './picktype/picktype.component';
import { LogoutComponent }              from './logout/logout.component';

import { CharacterFormComponent }     from './Forms/character/characterform/characterform.component';
import { BeastFormComponent }         from './Forms/beast/beastform/beastform.component';
import { ChapterFormComponent }       from './Forms/chapter/chapterform/chapterform.component';
import { StoryFormComponent }         from './Forms/story/storyform/storyform.component';
import { GuildFormComponent }         from './Forms/guild/guildform/guildform.component';
import { EditListComponent }           from './editlist/editlist.component';
import { SourceFormComponent }      from './Forms/source/sourceform/sourceform.component';
import { UpdateFormComponent } from './Forms/Update/update-form/update-form.component';
import { MiscFormComponent } from './Forms/misc/miscform/miscform.component';
import { MaindashComponent } from './dash/maindash/maindash.component';
import { MessageComponent } from './dash/message/message.component'

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
    MaindashComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
