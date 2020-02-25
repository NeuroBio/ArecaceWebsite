import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundhomeComponent } from './playgroundhome/playgroundhome.component';

import { ShowNewestModule } from '../SharedComponentModules/ShowNewest/show-newest.module';

@NgModule({
  declarations: [PlaygroundhomeComponent,
  ],
    
  imports: [
    CommonModule,
    ShowNewestModule,
    
    PlaygroundRoutingModule //must be last!
  ]
})

export class PlaygroundModule implements OnInit{

  ngOnInit(){
    window.scroll(0,0);
  }

 }