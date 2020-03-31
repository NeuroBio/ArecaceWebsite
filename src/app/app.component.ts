import { Component, ViewEncapsulation,
         ViewChild, ElementRef, AfterViewInit,
         QueryList, ViewChildren }                from '@angular/core';
import { ActivatedRoute }                         from '@angular/router';
import { FocusKeyManager }                        from '@angular/cdk/a11y';
         
import { GlobalVarsService}                       from './GlobalServices/global-vars.service';
import { LinkListElement, LinkList } from './SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  @ViewChild('flag', { static: true }) flag: ElementRef;
  title: string = 'Arecace';
  year: number = new Date().getFullYear()

  headerKeyManager: FocusKeyManager<any>;
  @ViewChildren('header') headItems: QueryList<any>;
  headerLeave = false;

  footerKeyManager: FocusKeyManager<any>;
  @ViewChildren('footer') footItems: QueryList<any>;
  footerLeave = false;

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
      new LinkListElement('Privacy Policy', 'privacy') ]);

  constructor(private global: GlobalVarsService,
              public route: ActivatedRoute) { }
  
  ngAfterViewInit() {
    setTimeout(() => { this.checkLoad() }, 1000);
    this.footerKeyManager = new FocusKeyManager(this.footItems)
      .withHorizontalOrientation('ltr');
    this.headerKeyManager = new FocusKeyManager(this.headItems)
    .withHorizontalOrientation('ltr');
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

  handleKeyDown(event: KeyboardEvent, keymanger: string) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.stopImmediatePropagation();
      this[`${keymanger}KeyManager`].onKeydown(event);
    }
    if(event.key === 'Tab') {
      this[`${keymanger}Leave`] = true;
      setTimeout(() => { this[`${keymanger}Leave`] = false; }, 10);
    }
  }

  focus(keymanger: string) {
    if(!this[`${keymanger}KeyManager`].activeItem) {
      this[`${keymanger}KeyManager`].setFirstItemActive();
    }
    this[`${keymanger}KeyManager`].activeItem.focus();
  }

}
