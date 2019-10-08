import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.css']
})
export class CalculatorsComponent implements OnInit {


  links = [{ Link: 'dateconvert', Title: 'Date Converter' },
           { Link: 'sourceaffinity', Title: 'Source Affinity Calculator' },]

  constructor() { }

  ngOnInit() {
  }

}
