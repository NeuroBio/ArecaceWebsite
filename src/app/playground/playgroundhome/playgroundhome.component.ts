import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { DateInfo } from 'src/app/Classes/ArecacenDates';

@Component({
  selector: 'app-playgroundhome',
  templateUrl: './playgroundhome.component.html',
  styleUrls: ['./playgroundhome.component.css']
})

export class PlaygroundhomeComponent implements OnInit {

  arecaceDate: string;
  DateInfo = new DateInfo();
  links = [
    { Link: 'activities', Name: 'Activities', Src: '../../assets/svgs/survey.svg' },
    { Link: 'notes', Name: 'Loose Notes', Src: '../../assets/svgs/notepad.svg' },
    { Link: 'nomadic', Name: 'Nomadic Dictionary', Src: '../../assets/svgs/dict.svg' },
    { Link: 'forum', Name: 'Forum (not launched!)', Src: '../../assets/svgs/forum.svg' }
  ];

  constructor(private titleserve: Title) { }

  ngOnInit() {
    this.titleserve.setTitle('Playground');
    const now = formatDate(new Date(), 'MM-dd', 'en').split('-');
    this.arecaceDate = this.DateInfo.earthtoArecaceConverter(+now[0], +now[1]);
  }

}
