import { Component, OnInit }  from '@angular/core';
import { Title }              from '@angular/platform-browser';

import { SiteMap }            from '../../../Classes/UploadDownloadPaths';
import { LinkList, LinkListElement } from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})

export class SiteMapComponent implements OnInit{

  SiteMap = new SiteMap();
  keys: string[];
  linkList: LinkList[];

  constructor(private titleserv: Title) { }

  ngOnInit() {
    this.titleserv.setTitle('Site Map');
    delete this.SiteMap.PathInfo;
    this.keys = Object.keys(this.SiteMap);

    this.linkList = this.keys.map(key =>
      new LinkList(key, this.SiteMap[key]));
    window.scroll(0,0);
  }

 }
