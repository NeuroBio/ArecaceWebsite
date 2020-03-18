import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component';

import { ShowNewestModule } from '../SharedComponentModules/ShowNewest/show-newest.module';
import { ImageButtonModule } from 'src/app/SharedComponentModules/SmallComponents/image-button/image-button.module';

@NgModule({
  declarations: [
    PlaygroundhomeComponent,
  ],
    
  imports: [
    CommonModule,
    ShowNewestModule,
    ImageButtonModule,
    
    PlaygroundRoutingModule //must be last!
  ]
})

export class PlaygroundModule implements OnInit{

  ngOnInit(){
    window.scroll(0,0);
  }

 }