import { Component, OnInit } from '@angular/core';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';
import { Intro } from 'src/app/Classes/intro';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})

export class IntroductionComponent implements OnInit{ 

  mainText: Intro[];
  links: string[];
  constructor(private textprovider: TextProvider) {}

  ngOnInit(){
    window.scroll(0,0);
    const temp = this.textprovider.WebsiteText
      .find(member =>
        member.ID =='intro');
    this.mainText = JSON.parse(temp.Intros);
    if(temp.Links){
      this.links = temp.Links;
    }

  }
  
}