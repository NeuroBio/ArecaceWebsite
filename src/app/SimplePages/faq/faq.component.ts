import { Component, OnInit }  from '@angular/core';
import { DomSanitizer }       from '@angular/platform-browser';

import { TextProvider }       from 'src/app/GlobalServices/textprovider.service';
import { Question }           from 'src/app/Classes/WebsiteText';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit{

  mainText: Question[];

  constructor(private textprovider: TextProvider,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    window.scroll(0,0);
    this.mainText = JSON.parse(this.textprovider.WebsiteText
                                .find(member =>
                                  member.ID =='faq').Questions);
  }

  
 }
