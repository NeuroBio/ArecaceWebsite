import { Component, OnInit }  from '@angular/core';
import { Title }              from '@angular/platform-browser';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private titleserv: Title) { }

  ngOnInit(): void {
    this.titleserv.setTitle('Sad Cicadas')
  }

}
