import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.css']
})
export class CalculatorsComponent implements OnInit {


  links = [{ Link: 'dateconvert', Title: 'Date Converter' },
           { Link: 'sourceaffinity', Title: 'Source Affinity Calculator' }];

  constructor(private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Calculators');
  }

}
