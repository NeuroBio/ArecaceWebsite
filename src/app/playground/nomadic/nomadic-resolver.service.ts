import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { NomadicService } from './nomadic.service';
import { CacheService } from 'src/app/GlobalServices/cache.service';

@Injectable({
  providedIn: 'root'
})
export class NomadicResolverService implements Resolve<any>{

  constructor(private router: Router,
              private cache: CacheService,
              private nomadserv: NomadicService) { }

  resolve() {
    if(this.cache.Cache['nomadic']) {
      this.nomadserv.initializeDictionary(this.cache.Cache['nomadic']);
      
    } else {
      // this.cache.addSubscription('Nomadic', this.firebaseserv.returnCollect('Nomadic'));
      return this.cache.addSubscription('nomadic', 'Nomadic')
        .then(() => {
          if (this.cache.Cache['nomadic'].value[0]) {
            this.nomadserv.initializeDictionary(this.cache.Cache['nomadic']);
          } else {
            delete this.cache.Cache['nomadic'];
            this.router.navigate(['badservice']);
          }
      });
    }
  }
}
