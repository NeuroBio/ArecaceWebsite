import { Component, OnInit, HostListener }  from '@angular/core';
import { Title }                            from '@angular/platform-browser';

import { TextProvider }                     from 'src/app/GlobalServices/textprovider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  buttonText: string[];
  mainText: string;

  constructor(private textprovider: TextProvider,
              private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Arecace');
    this.mainText = this.textprovider.WebsiteText
      .find(member => member.ID === 'home').Text;
    window.scroll(0,0);
    this.setButtonText();
  }

  @HostListener('window:resize')
  setButtonText() {
    if(window.innerWidth < 485){
      this.buttonText = ['Intro', 'Scripts','Comic','Play- ground'];
    } else {
      this.buttonText = ['Full Introduction',
                          'Start Comic Scripts',
                          'See Latest Page',
                          'Playground under construction!'];
    }
  }
}
