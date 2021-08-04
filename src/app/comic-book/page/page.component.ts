import { Component, OnInit, ElementRef, ViewChild }     from '@angular/core';
import { ActivatedRoute }                               from '@angular/router'

import { ComicService }                                 from '../comic.service'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {
  
  pageUrl: string;
  init: boolean;
  @ViewChild('main', { static: true }) main:ElementRef;
  
  constructor(private route: ActivatedRoute,
              private comicserv: ComicService) { }
  
  ngOnInit() {
    this.init = true;
    this.route.data.subscribe((data: {pageLink: string}) => {
        this.comicserv.setloading(true);
        this.pageUrl = data.pageLink;
    });
  }

  loaded() {
    this.comicserv.setloading(false);
    if(this.init) {
      this.init = false;
    } else {
      window.scroll(0, 120);
      //this.main.nativeElement.scrollIntoView();
    }
  }
}
