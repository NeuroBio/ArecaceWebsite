import { Component, OnInit, OnDestroy } from '@angular/core';
import { DownloadPageService } from '../download-page.service';
import { ActivatedRoute } from '@angular/router';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';
import { Subscription } from 'rxjs';
import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';

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

  constructor(private download: DownloadPageService,
              private route: ActivatedRoute,
              private getsegserv: GetRouteSegmentsService,
              private global: GlobalVarsService) { }

  ngOnInit() {
    window.scroll(0,0);
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.path = mainPath.join('/');
    this.stream = this.download.ImageData
      .subscribe(data => this.ImageData = data);
    this.name = this.ImageData.Name
      ? this.ImageData.Name
      : `${this.ImageData.FirstName} ${this.ImageData.LastName}`;
    this.loading = this.global.ImagesLoadable.value;
  }

  ngOnDestroy() {
    this.stream.unsubscribe();
  }

  switchView(){
    this.full = !this.full;
  }

}
