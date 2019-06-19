import { Component, OnInit, ElementRef, ViewChild }      from '@angular/core';
import { ActivatedRoute }         from '@angular/router'

import { ComicService }           from '../comic.service'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {
  
  pageUrl: string;
  init: boolean;
  @ViewChild('main') main:ElementRef;
  
  constructor(private route: ActivatedRoute,
              private comicserv: ComicService) { }
  
  ngOnInit() {
    this.init = true;
    this.route.data.subscribe((data: {pageLink: string}) =>
        this.pageUrl = data.pageLink);
  }

  loaded(){
    this.comicserv.loadingComplete();
    if(this.init){
      this.init = false;
    }else{
      this.main.nativeElement.scrollIntoView();
    }
  }
}
