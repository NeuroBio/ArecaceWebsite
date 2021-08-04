import { Component, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVarsService} from './GlobalServices/global-vars.service';
import { LinkListElement, LinkList } from './SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  @ViewChild('flag', { static: true }) flag: ElementRef;
  year: number = new Date().getFullYear();

  headerLinkList = new LinkList('header',
    [ new LinkListElement('Home', 'home'),
      new LinkListElement('Comic', 'comic'),
      new LinkListElement('Story', 'story' ),
      new LinkListElement('World', 'world'),
      new LinkListElement('*Play*', 'playground'),
      new LinkListElement('Extras', 'extras'),
      new LinkListElement('Dash', 'dash') ]);

  footerLinkList = new LinkList('footer',
    [ new LinkListElement('About', 'about'),
      new LinkListElement('Contact', 'contact'),
      new LinkListElement('FAQ', 'faq'),
      new LinkListElement('Site Map', 'sitemap'),
      new LinkListElement('Traveler\'s Guide', 'guide'),
      new LinkListElement('Privacy Policy', 'privacy'),
      new LinkListElement('Accessibility', 'accessibility')]);

  constructor(private global: GlobalVarsService,
              public route: ActivatedRoute) { }

  ngAfterViewInit() {
    setTimeout(() => { this.checkLoad(); }, 1000);
  }

  checkLoad() {
    if (this.flag.nativeElement.offsetWidth !== 1) {

      if (this.global.phone.value === false) { // allow spinner of mobile
        this.global.ImagesLoadable.next(false);

      }
    }
  }

}
