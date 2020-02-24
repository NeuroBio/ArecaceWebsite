import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { FireBaseService } from '../../GlobalServices/firebase.service';
import { NomadicService } from './nomadic.service';

@Injectable({
  providedIn: 'root'
})
export class NomadicResolverService implements Resolve<any>{

  constructor(private router: Router,
              private firebaseserv: FireBaseService,
              private nomadserv: NomadicService) { }

  resolve() {
    return this.firebaseserv.returnCollect('Nomadic').pipe(
      take(1),
      tap(dict => {
        if(dict[0]){
          this.nomadserv.initializeDictionary(dict);
        } else {
          this.router.navigate(["badservice"]);
        }
      }))
  }
}
