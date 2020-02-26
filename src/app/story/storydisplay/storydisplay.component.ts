import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location }                                 from '@angular/common';
import { ActivatedRoute }                           from '@angular/router';

import { StoryService }                             from '../story.service';


@Component({
  selector: 'app-storydisplay',
  templateUrl: './storydisplay.component.html',
  styleUrls: ['./storydisplay.component.css']
})
export class StorydisplayComponent implements OnInit {

  @ViewChild('tool', { static: true }) tool: ElementRef;
  @ViewChild('frame', { static: true }) frame: ElementRef;
  @ViewChild('main', { static: true }) main: ElementRef;
  leftspace: number;
  
  story: any;
  loading: boolean;


  constructor(private route:ActivatedRoute,
              private location: Location,
              private storyserv: StoryService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.story = data.Story;
      const path = [this.story['metaData'].Type,
                    this.story['metaData'].Series.split(' ').join(''),
                    this.story['metaData'].ID];

      this.location.go(`story/${path[0]}s/${path[1]}/${path[2]}`);
      setTimeout(() => this.onResize(), 10);
      this.main.nativeElement.scrollIntoView();
      this.storyserv.updateLoading(false);
    });

    this.storyserv.loading.subscribe(load => this.loading = load)
  }

  onResize() {
      this.leftspace = this.frame.nativeElement.clientWidth
      - this.tool.nativeElement.offsetLeft
      + this.tool.nativeElement.offsetWidth
      - 150;
  }

}
