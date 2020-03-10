import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription}                  from 'rxjs';

import { UpdateService }                from '../update.service';

import { PostData }                     from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-updatefeed',
  templateUrl: './updatefeed.component.html',
  styleUrls: ['./updatefeed.component.css']
})

export class UpdateFeedComponent implements OnInit, OnDestroy {

  postList: PostData[];
  message: string;
  stream1: Subscription;
  stream2: Subscription;

  constructor(private updateserv: UpdateService) { }

  ngOnInit() {
    this.updateserv.getPosts();
    this. stream1 = this.updateserv.posts
      .subscribe(posts => this.postList = posts);
    this.stream2 = this.updateserv.message
    .subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.updateserv.dispose();
  }

}
