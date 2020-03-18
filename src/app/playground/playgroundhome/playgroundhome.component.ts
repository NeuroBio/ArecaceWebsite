import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { DateInfo } from 'src/app/Classes/ArecacenDates';

@Component({
  selector: 'app-playgroundhome',
  templateUrl: './playgroundhome.component.html',
  styleUrls: ['./playgroundhome.component.css']
})
export class PlaygroundhomeComponent implements OnInit {

  arecaceDate: string;
  DateInfo = new DateInfo();
  links = [ {Link: 'activities', Title: 'Activities'},
            {Link: 'notes', Title: 'Loose Notes'},
            {Link: 'nomadic', Title: 'Nomadic Dictionary'},
          ]

  constructor() { }

  ngOnInit() {
    const now = formatDate(new Date(), 'MM-dd', 'en').split('-');
    this.arecaceDate = this.DateInfo.earthtoArecaceConverter(+now[0], +now[1]);
  }

}
