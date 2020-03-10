import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import {FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CacheService {

  Cache = {};

  constructor(private firebaseserv: FireBaseService) { }


  addEditSubscription(type: string, path: string) {
    this.Cache[`${type}-edit`] = new BehaviorSubject<any[]>(undefined);
    return new Promise ((resolve) => {
      return this.firebaseserv.returnCollectionWithKeys(path)
        .subscribe(collect =>
          resolve(this.Cache[`${type}-edit`].next(collect)));
    });
  }

  addSubscription(type: string, path: string) {
    this.Cache[type] = new BehaviorSubject<any[]>(undefined);
    return new Promise ((resolve) => {
      return this.firebaseserv.returnCollect(path)
        .subscribe(collect => 
          resolve(this.Cache[type].next(collect)) );
    });
  }

}
