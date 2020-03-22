import { Component, OnInit }            from '@angular/core';
import { ActivatedRoute }               from '@angular/router';

import { Observable }                   from 'rxjs';
import { map }                          from 'rxjs/operators';

import { GeneralcollectionService }     from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-mapsmain',
  templateUrl: './mapsmain.component.html'
})

export class MapsMainComponent implements OnInit {

  current: string;
  maps$: Observable<any[][]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.maps$ = this.generalcollectserv.returnMetaData().pipe(
      map(maps => {
        maps.sort((a,b) => a.Topic > b.Topic ? -1 : 1);
        return maps.map(map => [map.Topic, map.ID]);
      }) );

    this.route.firstChild.paramMap.subscribe(
      path => this.current = path.get('MapID') ); 
  }

}
