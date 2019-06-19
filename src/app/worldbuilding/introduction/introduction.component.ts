import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})

export class IntroductionComponent implements OnInit{ 

  ngOnInit(){
    window.scroll(0,0);
  }
  
}