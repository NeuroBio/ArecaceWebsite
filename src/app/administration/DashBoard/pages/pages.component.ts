import { Component, OnInit } from '@angular/core';
import { CRUDcontrollerService } from '../../services/CRUDcontroller.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.controller.assignFirePaths({Website: 'WebsiteText'}, 'Website');
    this.controller.assignButtons([true, false, false, false]);
  }

}
