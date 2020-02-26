import { Component, OnInit }          from '@angular/core';

import { Observable }                 from 'rxjs';
import { map }                        from 'rxjs/operators';

import { GeneralcollectionService }   from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-extrasmain',
  templateUrl: './extrasmain.component.html',
  styleUrls: ['./extrasmain.component.css']
})

export class ExtrasMainComponent implements OnInit {

  current: string;
  arts$: Observable<string[]>;

  constructor(private generalcollectserv: GeneralcollectionService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.arts$ = this.generalcollectserv.returnMetaData().pipe(
      map(art => art.sort((a,b) => a.Date > b.Date ? -1 : 1)) );
  }

}
