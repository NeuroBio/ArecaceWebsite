import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { Title }                    from '@angular/platform-browser';

@Component({
  selector: 'app-activitieshome',
  templateUrl: './activitieshome.component.html',
  styleUrls: ['./activitieshome.component.css']
})
export class ActivitieshomeComponent implements OnInit {

  links = [ {Link: 'surveys', Title: 'Surveys'},
            {Link: 'calc', Title: 'Calculators and Converters'},
            {Link: 'makefancharacter', Title: 'Make Character'}];
  selected: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private titleserv: Title) { }

  ngOnInit() {
    if(this.route.firstChild) {
      this.selected = this.route.firstChild.snapshot.url[0].path;
    }
    this.titleserv.setTitle('Activities');
  }

  pickActivity(index: number) {
    this.selected = this.links[index].Title;
    this.router.navigate([this.links[index].Link], {relativeTo: this.route});
  }

}
