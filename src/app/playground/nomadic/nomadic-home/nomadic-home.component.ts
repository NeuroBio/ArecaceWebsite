import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nomadic-home',
  templateUrl: './nomadic-home.component.html',
  styleUrls: ['./nomadic-home.component.css']
})
export class NomadicHomeComponent implements OnInit {

  choices = ['introduction', 'syntax', 'translate', 'dictionary'];
  selected: string;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.selected = this.route.firstChild.snapshot.url[0].path
  }

  pickTopic(index) {
    this.router.navigate([`${this.choices[index]}`], {relativeTo: this.route });
  }

}
