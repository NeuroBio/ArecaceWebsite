import { Component, OnInit, OnDestroy } from '@angular/core';
import { DownloadPageService } from '../download-page.service';
import { ActivatedRoute } from '@angular/router';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';
import { Subscription } from 'rxjs';

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

  constructor(private download: DownloadPageService,
              private route: ActivatedRoute,
              private getsegserv: GetRouteSegmentsService) { }

  ngOnInit() {
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.path = mainPath.join('/')
    this.stream = this.download.ImageData
      .subscribe(data => this.ImageData = data);
    this.name = this.ImageData.Name ? this.ImageData.Name
      : `${this.ImageData.FirstName} ${this.ImageData.LastName}`;
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }
}
