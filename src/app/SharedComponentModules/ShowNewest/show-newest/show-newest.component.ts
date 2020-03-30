import { Component, OnInit, Input,
         ElementRef, ViewChild, OnDestroy,
         ViewChildren, QueryList, AfterViewInit }   from '@angular/core';
import { FocusKeyManager }                          from '@angular/cdk/a11y';

import { Observable, fromEvent, Subscription }      from 'rxjs';
import { map }                                      from 'rxjs/operators';

import { FireBaseService }                          from 'src/app/GlobalServices/firebase.service';

import { LinkListElementComponent } from 'src/app/SharedComponentModules/SmallComponents/LinkList/link-list-element/link-list-element.component';
@Component({
  selector: 'app-show-newest',
  templateUrl: './show-newest.component.html',
  styleUrls: ['./show-newest.component.css']
})

export class ShowNewestComponent implements OnInit, OnDestroy, AfterViewInit {

  display$: Observable<any>;
  
  @Input() contentType: string;
  @Input() collectionName: string;
  @Input() contentLink: string;
  @Input() footerText: string;

  @ViewChild('itemBand') itemBand: ElementRef;
  @ViewChild('right', { static: true }) right: ElementRef;
  @ViewChild('left', { static: true }) left: ElementRef;
  
  KeyListener = fromEvent(document, 'keydown');
  stream: Subscription;

  keyManager: FocusKeyManager<any>
  @ViewChildren(LinkListElementComponent) items: QueryList<any>;
  leave: boolean = false;

  constructor(private firebaseserv: FireBaseService) { }

  ngOnInit() {
    this.stream = this.KeyListener
      .subscribe((event: KeyboardEvent) => this.KeyEvent(event));
    this.display$ = this.firebaseserv.returnCollect(this.collectionName).pipe(
      map(members => {
        members = members.filter(member => member.Allowed !== false);//remove hidden
        members = members.sort((a,b) => a.TimeStampCreated > b.TimeStampCreated ? 1 :-1);// order

        if(members.length > 10) {//cut to newest
          members = members.slice(0, 10);
        }

        return members.map(member => //set up for display
          member = {Name: member.Name,
                    Link: `${this.contentLink}/${member.ID}`,
                    Image: member.Links ? member.Links[0] : ''});
      }) );
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.items)
      .withHorizontalOrientation('ltr');
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  scroll(right: boolean) {
    if(right) {
      this.animate(170);
    } else {
      this.animate(-170);
    }
  }

  animate(amount: number) {
    if(HTMLElement.prototype.scrollTo) {
      this.itemBand.nativeElement.scrollTo(
        { left: (this.itemBand.nativeElement.scrollLeft + amount), behavior: 'smooth' });
    } else {
      this.itemBand.nativeElement.scrollLeft += amount;
    }
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


  //Arrow keys (trigger arrow options)
  KeyEvent(event: KeyboardEvent) {
    if(event.key === 'ArrowRight') {
      this.right.nativeElement.focus();
      this.animate(170);
    }

    if(event.key === 'ArrowLeft') {
      this.left.nativeElement.focus();
      this.animate(-170);
    }
  }

  focus() {
    if(!this.keyManager.activeItem) {
      this.keyManager.setFirstItemActive();
    }
    this.keyManager.activeItem.focus();
  }

}
