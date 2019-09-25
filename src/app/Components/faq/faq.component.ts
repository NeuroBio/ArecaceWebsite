import { Component, OnInit, HostListener } from '@angular/core';
import { TextProvider } from 'src/app/GlobalServices/textprovider.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit{

  mainText: string;

  constructor(private textprovider: TextProvider,
              public sanitizer: DomSanitizer,
              private router: Router) {}

  ngOnInit() {
    window.scroll(0,0);
    this.mainText = this.textprovider.WebsiteText
                        .find(member => member.ID =='faq').Text;
  }

  
 }
