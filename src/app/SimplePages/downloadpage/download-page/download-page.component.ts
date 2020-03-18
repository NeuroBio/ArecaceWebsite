import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DownloadPageService } from '../download-page.service';
import { ActivatedRoute } from '@angular/router';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';
import { Subscription } from 'rxjs';
import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';
import { BookmarkService } from 'src/app/SharedComponentModules/SmallComponents/bookmark/bookmark.service';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})

export class DownloadPageComponent implements OnInit, OnDestroy {

  ImageData: any;
  name: string;
  path: string;
  stream: Subscription;
  full = false;
  loading: boolean;
  maxed: boolean;
  @ViewChild('image', {static: false}) Image: ElementRef;

  constructor(private downloadserv: DownloadPageService,
              private route: ActivatedRoute,
              private getsegserv: GetRouteSegmentsService,
              private global: GlobalVarsService,
              private bookmarkserv: BookmarkService) { }

  ngOnInit() {
    window.scroll(0,0);
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.path = mainPath.join('/');
    this.stream = this.downloadserv.ImageData
      .subscribe(data => this.ImageData = data);
    this.name = this.ImageData.Name
      ? this.ImageData.Name
      : `${this.ImageData.FirstName} ${this.ImageData.LastName}'s Bio Pic`;
    this.loading = this.global.ImagesLoadable.value;
    this.bookmarkserv.real.next(this.downloadserv.real)
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
    this.bookmarkserv.dispose();
  }

  switchView(){
    this.full = !this.full;
  }

  onLoad() {
    this.loading = false;
    this.onResize();
  }

  onResize() {
    if(this.Image.nativeElement.offsetWidth + 33 < window.innerWidth) {
      this.maxed = true
    } else {
      this.maxed = false;
    }
  }

}
