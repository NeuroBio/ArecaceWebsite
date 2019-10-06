import { Component, OnInit } from '@angular/core';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-others-art',
  templateUrl: './others-art.component.html',
  styleUrls: ['./others-art.component.css']
})
export class OthersArtComponent implements OnInit {

  current: string;
  arts$: Observable<string[]>;

  constructor(private generalcollectserv: GeneralcollectionService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.arts$ = this.generalcollectserv.returnMetaData().pipe(
      map(art => art.filter(a => a.Permission)),
      map(art => art.sort((a,b) => a.Date > b.Date ? -1 : 1))
    )
  }

}
