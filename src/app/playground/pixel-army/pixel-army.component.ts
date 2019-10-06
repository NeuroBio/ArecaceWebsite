import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';

@Component({
  selector: 'app-pixel-army',
  templateUrl: './pixel-army.component.html',
  styleUrls: ['./pixel-army.component.css']
})
export class PixelArmyComponent implements OnInit {

  pixels$: Observable<any>;

  constructor(private firebaseserv: FireBaseService,
              private auth: AuthService) { }

  ngOnInit() {
    this.pixels$ = this.firebaseserv.returnCollect('Pixels').pipe(
      map(art => {
        if(this.auth.isLoggedIn){
          if(this.auth.user.value.roles[1]){
            return art;
          }
        }
        art = art.filter(a => a.Allowed);
        return art;
      }),
      map(art => art.sort((a,b) => a.Date > b.Date ? -1 : 1))
    );

    this.pixels$.subscribe(x => console.log(x))
  }

}
