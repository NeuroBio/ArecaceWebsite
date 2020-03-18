import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activitieshome',
  templateUrl: './activitieshome.component.html',
  styleUrls: ['./activitieshome.component.css']
})
export class ActivitieshomeComponent implements OnInit {

  links = [ {Link: 'surveys', Title: 'Surveys'},
            {Link: 'calc', Title: 'Calculators and Converters'},
            {Link: 'makefancharacter', Title: 'Make Character'}]

  constructor() { }

  ngOnInit() {
  }

}
