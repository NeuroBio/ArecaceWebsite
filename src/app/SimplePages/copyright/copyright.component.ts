import { Component, OnInit }  from '@angular/core';
import { Title }              from '@angular/platform-browser';

import { TextProvider }       from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})

export class CopyrightComponent implements OnInit {

  mainText: string;

  constructor(private textprovider: TextProvider,
              private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Copyright')
    window.scroll(0,0);
    this.mainText = this.textprovider.WebsiteText
      .find(member => member.ID =='copyright').Text;
  }

 }
