import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-activitieshome',
  templateUrl: './activitieshome.component.html',
  styleUrls: ['./activitieshome.component.css']
})
export class ActivitieshomeComponent implements OnInit {

  links = ['surveys', 'calc', 'makefancharacter'];
  linkNames = ['Surveys', 'Calculators and Converters', 'Make Fan Character'];
  selected: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private titleserv: Title) { }

  ngOnInit() {
    if (this.route.firstChild) {
      const index = this.links.findIndex(link =>
        link === this.route.firstChild.snapshot.url[0].path);
      this.selected = index;
    }
    this.titleserv.setTitle('Activities');
  }

  pickActivity(index: number) {
    this.router.navigate([this.links[index]], {relativeTo: this.route});
  }

}
