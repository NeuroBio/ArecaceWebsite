import { Component, OnInit }  from '@angular/core';
import { Title }              from '@angular/platform-browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit {

  constructor(private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Admin');
  }
}
