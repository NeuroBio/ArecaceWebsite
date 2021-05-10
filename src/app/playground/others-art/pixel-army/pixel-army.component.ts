import { Component, OnInit }  from '@angular/core';

import { Observable }         from 'rxjs';
import { map }                from 'rxjs/operators';

import { AuthService }        from 'src/app/administration/security/Auth/auth.service';
import { FireBaseService }    from 'src/app/GlobalServices/firebase.service';

import { LinkListElement }    from 'src/app/SharedComponentModules/SmallComponents/LinkList/linklist';
import { OthersArt } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-pixel-army',
  templateUrl: './pixel-army.component.html',
  styleUrls: ['./pixel-army.component.css']
})

export class PixelArmyComponent implements OnInit {

  pixels$: Observable<LinkListElement[]>;

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService) { }

  ngOnInit() {
    this.pixels$ = this.firebaseserv.returnCollect('Pixels').pipe(
      map((art: any[]) => {
        if(this.auth.isAdmin()) {
          return art;
        }
        art = art.filter(a => a.Allowed);
        return art;
      }),
      map((art: any[]) => {
        art.sort((a,b) => a.Date > b.Date ? -1 : 1)
        return art.map((piece: OthersArt) =>
          new LinkListElement(piece.Name, undefined, piece.ArtistLink, piece));
      }) );
  }

}
