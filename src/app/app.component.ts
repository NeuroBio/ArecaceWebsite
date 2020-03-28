import { Component, ViewEncapsulation,
         ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren }   from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FocusKeyManager } from '@angular/cdk/a11y';
         
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

  headerKeyManager: FocusKeyManager<any>;
  @ViewChildren('header') headItems: QueryList<any>;
  headerLeave = false;

  footerKeyManager: FocusKeyManager<any>;
  @ViewChildren('footer') footItems: QueryList<any>;
  footerLeave = false;

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
  
  constructor(private global: GlobalVarsService,
              public route: ActivatedRoute) { }
  
  ngAfterViewInit() {
    this.headerKeyManager = new FocusKeyManager(this.headItems)
      .withHorizontalOrientation('ltr');
    this.headerKeyManager.setFirstItemActive();
    this.footerKeyManager = new FocusKeyManager(this.footItems)
      .withHorizontalOrientation('ltr');
    this.footerKeyManager.setFirstItemActive();
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

  handleKeyDown(event: KeyboardEvent, keymanger: string) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.stopImmediatePropagation();
      this[`${keymanger}KeyManager`].onKeydown(event);
    }
    if(event.shiftKey == true && event.key === 'Tab') {
      this[`${keymanger}Leave`] = true;
      setTimeout(() => { this[`${keymanger}Leave`] = false; }, 10);
    }
  }

  focus(keymanger: string) {
    console.log(keymanger)
    if(!this[`${keymanger}KeyManager`].activeItem) {
      this[`${keymanger}KeyManager`].setFirstItemActive();
    }
    this[`${keymanger}KeyManager`].activeItem.focus();
  }
}
