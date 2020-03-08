import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class CacheService {

  Cache = {};

  constructor() { }

  addSubscription(type: string, collection: Observable<any[]>) {
    collection.subscribe(collect => {
      console.log(`updating ${type} cache!`)
      this.Cache[type] = collect;
    }
    );
  }
}
