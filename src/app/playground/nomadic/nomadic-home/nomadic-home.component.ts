import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';

import { NomadicService }               from '../nomadic.service';

@Component({
  selector: 'app-nomadic-home',
  templateUrl: './nomadic-home.component.html',
  styleUrls: ['./nomadic-home.component.css']
})

export class NomadicHomeComponent implements OnInit, OnDestroy {

  choiceLinks = ['introduction', 'syntax', 'translate', 'dictionary'];
  choices = ['Introduction', 'Syntax', 'Translate', 'Dictionary'];
  selected: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private nomadicserv: NomadicService) { }

  ngOnInit() {
    const index = this.choiceLinks.findIndex(choice =>
      choice === this.route.firstChild.snapshot.url[0].path);
    this.selected = index;
  }

  ngOnDestroy() {
    this.nomadicserv.dispose();
  }
  
  pickTopic(index) {
    this.router.navigate([`${this.choiceLinks[index]}`], {relativeTo: this.route });
  }

}
