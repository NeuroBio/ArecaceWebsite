import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  contentPicker: number = 0;
  choices: string[] = ['The Story', "Me", "The Website"];

  ngOnInit(){
    window.scroll(0,0);
  }
  
  pickAbout(index: number){
    this.contentPicker=index;
  }

}
