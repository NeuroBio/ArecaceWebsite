import { Component, OnInit, Input, ElementRef, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-newest',
  templateUrl: './show-newest.component.html',
  styleUrls: ['./show-newest.component.css']
})

export class ShowNewestComponent implements OnInit, OnDestroy {

  display$: Observable<any>;
  @Input() contentType: string;
  @Input() collectionName: string;
  @Input() contentLink: string;
  @Input() footerText: string;
  @ViewChild('items') items: ElementRef;
  @ViewChild('right', { static: true }) right: ElementRef;
  @ViewChild('left', { static: true }) left: ElementRef;
  
  KeyListener = fromEvent(document, 'keydown');
  stream: Subscription;

  constructor(private firebaseserv: FireBaseService) { }

  ngOnInit() {
    this.display$ = this.firebaseserv.returnCollect(this.collectionName).pipe(
      map(members => {
        // console.log(members)
        //remove hidden
        members = members.filter(member => member.Allowed !== false);

        // order
        members = members.sort((a,b) => a.TimeStampCreated > b.TimeStampCreated ? 1 :-1);
        
        //cut to newest
        if(members.length > 10) {
          members = members.slice(0, 10);
        }

        //set up for display
        return members.map(member =>
          member = {Name: member.Name,
                    Link: `${this.contentLink}/${member.ID}`,
                    Image: member.Links ? member.Links[0] : ''});
      })
    );
    this.stream = this.KeyListener
      .subscribe((event: KeyboardEvent) => this.KeyEvent(event));
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
      this.items.nativeElement.scrollTo(
        { left: (this.items.nativeElement.scrollLeft + amount), behavior: 'smooth' });
    } else {
      this.items.nativeElement.scrollLeft += amount;
    }
  }

  //Arrow keys (trigger arrow options)
  KeyEvent(event: KeyboardEvent){ 
    if(event.keyCode === 39){//right, next
      this.right.nativeElement.focus();
      this.animate(170);
    }

    if(event.keyCode === 37){//left, prev
      this.left.nativeElement.focus();
      this.animate(-170);
    }
  }


}
