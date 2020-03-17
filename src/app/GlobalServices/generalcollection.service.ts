import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralcollectionService {

  collectionData = new BehaviorSubject<any[]>([]);
  type = new BehaviorSubject<string>(null);
  stream: Subscription;
  
  initializeMetaData(meta: BehaviorSubject<any[]>, type: string){
    this.stream = meta.subscribe(data => this.collectionData.next(data));
    this.type.next(type);
  }

  returnMetaData() {
    return this.collectionData;
  }

  getMember(ID:string) {
    // if(ID === 'Latest') {
    //   return this.returnMetaData();
    // } else {
      return this.returnMetaData().pipe(
        map(members =>
          members.find(member => member.ID === ID)) );
    // }
  }

  dispose() {
    if(this.stream) {
      this.stream.unsubscribe();
    }
  }
}
