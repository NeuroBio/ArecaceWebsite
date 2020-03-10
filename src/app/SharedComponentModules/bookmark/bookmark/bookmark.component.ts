import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { User } from '../../../Classes/ContentClasses';

import { BookmarkService } from '../bookmark.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})

export class BookmarkComponent implements OnInit, OnChanges, OnDestroy {

  @Input() path;
  @Input() type;
  @Input() name;
  @Input() bookmarkImage: boolean = true;
  data: User;
  color: string;
  hover: boolean = false;
  notLoggedIn: boolean;
  marksrc: string;
  stream: Subscription;

  constructor(private bookmarkserv: BookmarkService,
              private auth: AuthService) { }

  ngOnInit() {
    this.stream = this.auth.user.subscribe(data => {
      this.data = data;
      this.notLoggedIn = !this.auth.isUser();
      this.setColors();
    });
    if(this.bookmarkImage) {
      this.marksrc = 'assets/svgs/bookmark-bar.svg';
    } else {
      this.marksrc ='assets/svgs/star.svg';
    }
  }

  ngOnChanges() {
    if(this.data) {
      this.setColors();
    }
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  bookmark() {
    const index = this.checkBookmark();
    if(index < 0) {
      this.bookmarkserv.addBookmark(this.type, this.path, this.name);
    } else {
      this.bookmarkserv.removeBookmark(this.type, index);
    }
  }

  checkBookmark() {
    let index;
    if(this.data[this.type]) {
      index = this.data[this.type].findIndex(link => link.path === this.path);
    } else {
      index = -1;
    }
    return index;
  }

  setColors(){
    if(this.notLoggedIn) {
      this.color = 'rgb(180,180,180)';
    } else {
      this.color = this.checkBookmark() < 0
      ? 'rgb(49,49,49)'
      : '#e67e00';
    }
  }

}
