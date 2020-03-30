import { Component, OnInit, ViewChildren,
         QueryList, AfterViewInit }       from '@angular/core';
import { FocusKeyManager }                from '@angular/cdk/a11y';

import { Observable }         from 'rxjs';
import { map }                from 'rxjs/operators';

import { AuthService }        from 'src/app/administration/security/Auth/auth.service';
import { FireBaseService }    from 'src/app/GlobalServices/firebase.service';

import { LinkListElementComponent } from 'src/app/SharedComponentModules/SmallComponents/LinkList/link-list-element/link-list-element.component';

@Component({
  selector: 'app-pixel-army',
  templateUrl: './pixel-army.component.html',
  styleUrls: ['./pixel-army.component.css']
})

export class PixelArmyComponent implements OnInit, AfterViewInit {

  pixels$: Observable<any>;
  leave: boolean = false;
  keyManager: FocusKeyManager<any>;
  @ViewChildren(LinkListElementComponent) items: QueryList<any>

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService) { }

  ngOnInit() {
    this.pixels$ = this.firebaseserv.returnCollect('Pixels').pipe(
      map(art => {
        if(this.auth.isAdmin()) {
          return art;
        }
        art = art.filter(a => a.Allowed);
        return art;
      }),
      map(art => art.sort((a,b) => a.Date > b.Date ? -1 : 1)) );
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager<any>(this.items)
    .withHorizontalOrientation('ltr');
  }

  handleKeyDown(event: KeyboardEvent){
    if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.stopImmediatePropagation();
      this.keyManager.onKeydown(event);
    }

    if(event.key === 'Tab') {
      this.leave = true;
      setTimeout(() => { this.leave = false }, 10);
    }
  }

  focus() {
    if(!this.keyManager.activeItem) {
      this.keyManager.setFirstItemActive();
    }
    this.keyManager.activeItem.focus();
  }
}
