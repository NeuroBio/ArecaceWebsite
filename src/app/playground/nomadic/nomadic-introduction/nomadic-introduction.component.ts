import { Component, OnInit }  from '@angular/core';
import { Title }              from '@angular/platform-browser';

import { TextProvider }       from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-nomadic-introduction',
  templateUrl: './nomadic-introduction.component.html',
  styleUrls: ['./nomadic-introduction.component.css']
})
export class NomadicIntroductionComponent implements OnInit {

  mainText: string;

  constructor(private textprovider: TextProvider,
              private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Nomadic: Introduction');
    this.mainText = this.textprovider.WebsiteText.find(member =>
      member.ID =='nomadicintro').Text;
  }

}
