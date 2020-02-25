import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  @Input() path;
  @Input() type;

  constructor(private bookmarkserv: BookmarkService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
  }

  addBookmark() {
    this.bookmarkserv.bookmark(this.type, this.path);
  }

}
