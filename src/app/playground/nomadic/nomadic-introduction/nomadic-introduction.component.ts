import { Component, OnInit } from '@angular/core';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-nomadic-introduction',
  templateUrl: './nomadic-introduction.component.html',
  styleUrls: ['./nomadic-introduction.component.css']
})
export class NomadicIntroductionComponent implements OnInit {

  mainText: string;

  constructor(private textprovider: TextProvider) { }

  ngOnInit() {
    this.mainText = this.textprovider.WebsiteText.find(member =>
      member.ID =='nomadicintro').Text;
  }

}
