import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { FireBaseService } from '../../GlobalServices/firebase.service';
import { NomadicService } from './nomadic.service';
import { CacheService } from 'src/app/GlobalServices/cache.service';

@Injectable({
  providedIn: 'root'
})
export class NomadicResolverService implements Resolve<any>{

  constructor(private router: Router,
              private firebaseserv: FireBaseService,
              private cache: CacheService,
              private nomadserv: NomadicService) { }

  resolve() {
    if(this.cache.Cache['Nomadic']) {
      this.nomadserv.initializeDictionary(this.cache.Cache['Nomadic'].value);
      
    } else {
      // this.cache.addSubscription('Nomadic', this.firebaseserv.returnCollect('Nomadic'));
      return this.firebaseserv.returnCollect('Nomadic').pipe(
        take(1),
        tap(dict => {
          if(dict[0]){
            this.nomadserv.initializeDictionary(dict);
          } else {
            this.router.navigate(["badservice"]);
          }
      }) );
    }
  }
}
