import { Component, OnInit, Input,
         ElementRef, OnDestroy, ViewChild }         from '@angular/core';

import { Observable, fromEvent, Subscription }      from 'rxjs';
import { map }                                      from 'rxjs/operators';

import { FireBaseService }                          from 'src/app/GlobalServices/firebase.service';

import { LinkListElement }                          from '../../SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-show-newest',
  templateUrl: './show-newest.component.html',
  styleUrls: ['./show-newest.component.css']
})

export class ShowNewestComponent implements OnInit, OnDestroy {

  display$: Observable<LinkListElement[]>;
  imageLength = 160;

  @Input() contentType: string;
  @Input() collectionName: string;
  @Input() contentLink: string;
  @Input() footerText: string;

  @ViewChild('itemBand') itemBand: ElementRef;
  @ViewChild('right', { static: true }) right: ElementRef;
  @ViewChild('left', { static: true }) left: ElementRef;
  
  KeyListener = fromEvent(document, 'keydown');
  stream: Subscription;

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

        return members = members.map(member => //set up for display
          member = new LinkListElement(
            member.Name,
            `${this.contentLink}/${member.ID}`,
            undefined,
            { Name: member.Name,
              Image: member.Links ? member.Links[0] : '' }));
      }) );
    }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }


  scroll(right: boolean) {
    if(right) {
      this.animate(this.imageLength);
    } else {
      this.animate(this.imageLength*-1);
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

  //Arrow keys (trigger arrow options)
  KeyEvent(event: KeyboardEvent) {
    if(event.key === 'ArrowRight') {
      this.right.nativeElement.focus();
      this.animate(this.imageLength);
    }

    if(event.key === 'ArrowLeft') {
      this.left.nativeElement.focus();
      this.animate(this.imageLength*-1);
    }
  }

}
