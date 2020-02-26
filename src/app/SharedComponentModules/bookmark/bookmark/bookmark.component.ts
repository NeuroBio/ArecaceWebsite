import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { User } from '../../../Classes/user';

import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})

export class BookmarkComponent implements OnInit, OnChanges {

  @Input() path;
  @Input() type;
  @Input() name;
  data: User;
  color: string;
  hover = false;
  notLoggedIn: boolean;

  constructor(private bookmarkserv: BookmarkService) { }

  ngOnInit() {
    this.bookmarkserv.userData.subscribe(data => {
      this.data = data;
      this.notLoggedIn = data === undefined;
      this.setColors();
    });
  }

  ngOnChanges() {
    if(this.data) {
      this.setColors();
    }
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
