import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GlobalVarsService } from 'src/app/GlobalServices/global-vars.service';
import { GetRouteSegmentsService } from 'src/app/GlobalServices/commonfunctions.service';

import { GeneralMetaData } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-details-display',
  templateUrl: './details-display.component.html',
  styleUrls: ['./details-display.component.css']
})

export class DetailsDisplayComponent implements OnInit {

  loading: boolean;
  ref: GeneralMetaData;
  path: string;
  name: string;

  constructor(
    private route: ActivatedRoute,
    private global: GlobalVarsService,
    private getsegserv: GetRouteSegmentsService
  ) { }

  ngOnInit() {
    const mainPath = this.getsegserv.fetch(this.route.snapshot.pathFromRoot);
    this.route.data.subscribe((data: { Ref: GeneralMetaData }) => {
      this.loading = this.global.ImagesLoadable.value;
      window.scroll(0,0);
      this.ref = data.Ref;
      this.name = this.ref.Topic;
      this.path = `/${mainPath.join('/')}/${this.ref.ID}`;
    });
  }

}
