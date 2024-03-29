import { Component, OnInit }          from '@angular/core';

import { Observable }                 from 'rxjs';
import { map, take }                  from 'rxjs/operators';

import { AuthService }                from 'src/app/administration/security/Auth/auth.service';
import { GeneralcollectionService }   from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-others-art',
  templateUrl: './others-art.component.html',
  styleUrls: ['./others-art.component.css']
})

export class OthersArtComponent implements OnInit {

  current: string;
  arts$: Observable<string[]>;

  constructor(private generalcollectserv: GeneralcollectionService,
              private auth: AuthService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.arts$ = this.generalcollectserv.returnMetaData().pipe(
      take(1),
      map((art: any[]) => {
        if(this.auth.isLoggedIn === true) {
          if(this.auth.isAdmin()) {
            return art;
          }
        }
        art = art.filter(a => a.Allowed);
        this.generalcollectserv.collectionData.next(art);
        return art;
      }),
      map((art: any[]) => art.sort((a,b) => a.Date > b.Date ? -1 : 1)) );
  }

}
