import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';

@Component({
  selector: 'app-blowupmaster',
  templateUrl: './blowupmaster.component.html'
})

export class BlowupmasterComponent implements OnInit {

  linksList: any[];
  index: number;
  gridPath: string;

  constructor(
    private route: ActivatedRoute,
    private generalcollectserv: GeneralcollectionService,
    private getrouteserv: GetRouteSegmentsService
  ) { }

  ngOnInit() {
    this.gridPath = this.getrouteserv
      .fetch(this.route.snapshot.pathFromRoot).join('/');
    this.generalcollectserv.returnMetaData()
      .subscribe(collect => this.linksList = collect).unsubscribe();

    this.route.data.subscribe(data =>
      this.index = this.linksList.findIndex(member => member.ID === data.links.ID) );
  }

}
