import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TextProvider } from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  contentPicker: number = 0;
  choices: string[] = ['The Story', 'Me', 'The Website'];
  mainText: any;

  constructor(
    private textprovider: TextProvider,
    private titleserv: Title
  ) { }

  ngOnInit() {
    this.titleserv.setTitle('About');
    window.scroll(0, 0);
    this.mainText = this.textprovider.WebsiteText
      .find(member => member.ID === 'about');
  }

  pickAbout(index: number) {
    this.contentPicker = index;
  }

}
