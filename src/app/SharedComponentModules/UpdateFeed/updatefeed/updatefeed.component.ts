import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription}                  from 'rxjs';
import { map }                          from 'rxjs/operators';

import { UpdateService }                from '../update.service';

import { PostData }                     from 'src/app/Classes/ContentClasses';
import { LinkList, LinkListElement } from '../../SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-updatefeed',
  templateUrl: './updatefeed.component.html',
  styleUrls: ['./updatefeed.component.css']
})

export class UpdateFeedComponent implements OnInit, OnDestroy {

  postList: LinkList;
  message: string;
  stream1: Subscription;
  stream2: Subscription;

  constructor(private updateserv: UpdateService) { }

  ngOnInit() {
    this.updateserv.getPosts();
    this. stream1 = this.updateserv.posts
      .subscribe((posts: PostData[]) => {
          if(posts) {
            this.postList = new LinkList('Posts', posts.map(post =>
              new LinkListElement(post.ID, undefined, undefined, post))); 
            console.log(this.postList) 
          }
    });

    this.stream2 = this.updateserv.message
      .subscribe(message => this.message = message);
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.updateserv.dispose();
  }

}
