import { Component, ViewEncapsulation,
         ViewChild, ElementRef, AfterViewInit }   from '@angular/core';

import { GlobalVarsService}                       from './GlobalServices/global-vars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewInit {

  @ViewChild('flag', { static: true }) flag: ElementRef;
  title: string = 'Arecace';
  year: number = new Date().getFullYear()

  headerLinkList: {}[] = [{ link:'home', name: 'Home' },
                          { link:'comic', name: 'Comic' },
                          { link:'story', name: 'Story' },
                          { link:'world', name: 'World' },
                          { link:'playground', name: '*Play*' },
                          { link:'extras', name: 'Extras' },
                          { link:'dash', name: 'Dash' }]

  footerLinkList: {}[] = [{ link:'about', name: 'About' },
                          { link: 'contact', name: 'Contact' },
                          { link: 'faq', name: 'FAQ' },
                          { link: 'sitemap', name: 'Site Map' },
                          { link: 'guide', name: 'Traveler\'s Guide' },
                          { link: 'privacy', name: 'Privacy Policy' }]
  
  constructor(private global: GlobalVarsService) { }
  
  ngAfterViewInit() {
    setTimeout(() => { this.checkLoad() }, 1000);
  }

  checkLoad() {
    if(this.flag.nativeElement.offsetWidth !== 1) {
      if(this.global.phone) {
        this.global.ImagesLoadable.next(false);
      } else {
        this.global.ImagesLoadable.next(false);
      }
    }
  }
}
