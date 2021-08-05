import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})

export class PageNotFoundComponent implements OnInit {

  constructor(private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Not Found...');
    window.scroll(0, 0);
  }

}
