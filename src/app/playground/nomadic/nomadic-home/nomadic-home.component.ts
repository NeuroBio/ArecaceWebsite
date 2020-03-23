import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

import { NomadicService }               from '../nomadic.service';

@Component({
  selector: 'app-nomadic-home',
  templateUrl: './nomadic-home.component.html',
  styleUrls: ['./nomadic-home.component.css']
})

export class NomadicHomeComponent implements OnInit, OnDestroy {

  choices = ['introduction', 'syntax', 'translate', 'dictionary'];
  selected: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private nomadicserv: NomadicService) { }

  ngOnInit() {
    this.selected = this.route.firstChild.snapshot.url[0].path;
  }

  ngOnDestroy() {
    this.nomadicserv.dispose();
  }
  
  pickTopic(index) {
    this.router.navigate([`${this.choices[index]}`], {relativeTo: this.route });
  }

}
