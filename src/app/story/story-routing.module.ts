import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriesChooserComponent } from './serieschooser/serieschooser.component';
import { StorydisplayComponent } from './storydisplay/storydisplay.component';

import { StoryResolver1Service } from './resolvers/storyresolver1.service';
import { StoryResolver2Service } from './resolvers/storyresolver2.service';
import { StoryResolver3Service } from './resolvers/storyresolver3.service';


const storyRoutes: Routes = [
  {path: '', redirectTo: 'Scripts', pathMatch:"full"},
  {path: ':StoryType',
  resolve: {StoryResolver1Service},
  children:[
    {path: '', redirectTo: "First", pathMatch:'full'},
    {path: ':SeriesID', component:SeriesChooserComponent,
    resolve: {StoryResolver2Service},
    children:[
      {path: '', redirectTo:'First', pathMatch: 'full'},
      {path: ':StoryID',  component:StorydisplayComponent,
      resolve: {Story:StoryResolver3Service}}
    ]
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(storyRoutes)],
  exports: [RouterModule]
})

export class StoryRoutingModule { }
