import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription }     from 'rxjs';
import { map }                          from 'rxjs/operators';

import { GeneralcollectionService }     from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-extrasmain',
  templateUrl: './extrasmain.component.html',
  styleUrls: ['./extrasmain.component.css']
})

export class ExtrasMainComponent implements OnInit, OnDestroy {

  current: string;
  arts$: Observable<string[]>;
  stream: Subscription;

  constructor(private generalcollectserv: GeneralcollectionService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.arts$ = this.generalcollectserv.returnMetaData().pipe(
      map(art => art.sort((a,b) => a.Date > b.Date ? -1 : 1)) );
  }

  ngOnDestroy() {
    this.generalcollectserv.dispose();
  }

}
