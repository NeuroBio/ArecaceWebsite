import { Component, OnInit, Input } from '@angular/core';
import { CharacterMetaData } from 'src/app/Classes/charactermetadata';

@Component({
  selector: 'app-fan-characters',
  templateUrl: './fan-characters.component.html',
  styleUrls: ['./fan-characters.component.css']
})
export class FanCharactersComponent implements OnInit {

  @Input() data: any[];
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
