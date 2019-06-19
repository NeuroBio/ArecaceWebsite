import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badservice',
  templateUrl: './badservice.component.html',
  styleUrls: ['./badservice.component.css']
})
export class BadserviceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0);
  }

}
