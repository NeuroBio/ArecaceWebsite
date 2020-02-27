import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})
export class ViewHomeComponent implements OnInit {

  type: string;
  current: string;
  userData$: Observable<string[][][]>;

  constructor(private generalcollectionserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userData$ = this.generalcollectionserv.returnMetaData().pipe(
      map(userdata => userdata.map(datum => ['fu', datum.ID])));
    this.current = this.route.snapshot.firstChild.url[0].path
  }

}
