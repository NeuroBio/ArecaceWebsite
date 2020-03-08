import { Component, OnInit } from '@angular/core';
import { DownloadPageService } from '../download-page.service';

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})

export class DownloadPageComponent implements OnInit {

  imgUrl: string;

  constructor(private download: DownloadPageService) { }

  ngOnInit() {
    this.imgUrl = this.download.imgUrl;
  }
}
