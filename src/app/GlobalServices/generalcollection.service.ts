import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralcollectionService {

  collectionData = new BehaviorSubject<any[]>([]);
  type = new BehaviorSubject<string>(null);
  
  initializeMetaData(meta:any[], type: string){
    this.collectionData.next(meta);
    this.type.next(type);
  }

  returnMetaData(){
    return this.collectionData;
  }


  getMember(ID:string){
    if(ID === 'Latest') {
      return this.returnMetaData();
      // .pipe(
      //   map(members =>
      //     members.reduce((a, b) => a.TimeStampCreated > b.TimeStampCreated ? a : b))
      // )
    } else {
      return this.returnMetaData().pipe(
        map(members =>
          members.find(member => member.ID === ID))
      );
    }
  }

  // getReference(ID:string, Ref:string){
  //   return this.getMember(ID).pipe(
  //     map(member =>
  //       member.References.find(member => member.ID === Ref))
  //   );
  // }
}
