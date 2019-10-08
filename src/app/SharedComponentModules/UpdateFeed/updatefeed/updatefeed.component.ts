import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UpdateService } from '../update.service';

@Component({
  selector: 'app-updatefeed',
  templateUrl: './updatefeed.component.html',
  styleUrls: ['./updatefeed.component.css']
})

export class UpdateFeedComponent implements OnInit {

  postList$: Observable<any[]>;

  constructor(private updateserv: UpdateService) { }

  ngOnInit() {
    this.postList$ = this.updateserv.getPosts();
  }

}
