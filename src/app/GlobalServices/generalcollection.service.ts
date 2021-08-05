import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinkList } from '../SharedComponentModules/SmallComponents/LinkList/linklist';

@Injectable({
  providedIn: 'root'
})
export class GeneralcollectionService {

  collectionData = new BehaviorSubject<any[]>([]);
  type = new BehaviorSubject<string>(null);
  stream: Subscription;

  initializeMetaData(meta: BehaviorSubject<any[]>, type: string) {
    this.stream = meta.subscribe(data => this.collectionData.next(data));
    this.type.next(type);
  }

  returnMetaData() {
    return this.collectionData;
  }

  getMember(ID: string) {
    return this.returnMetaData().pipe(
      map(members => members.find(member => member.ID === ID)) );
  }

  getCurrent(data$: Observable<LinkList | LinkList[]>, routeID: string) {
    let current: string;
    data$.subscribe(data => {
      if (routeID) { // child route doesn't exist
        if (data instanceof LinkList) {
          const index = data.Data.findIndex(datum => datum.Route === routeID);
          current = data.Data[index].ListName;
        } else {
          data.forEach(type => {
            const index = type.Data.findIndex(datum => datum.Route === routeID);
            if (index > -1) {
              current = type.Data[index].ListName;
            }
          });
        }
      }
    }).unsubscribe();
    return current;
  }

  dispose() {
    if (this.stream) {
      this.stream.unsubscribe();
    }
  }
}
