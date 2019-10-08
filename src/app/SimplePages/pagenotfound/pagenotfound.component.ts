import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})

export class PageNotFoundComponent implements OnInit{

  ngOnInit(){
    window.scroll(0,0);
  }
  
}
