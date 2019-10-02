import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralcollectionService {

  collectionData = new BehaviorSubject<any[]>([]);
  memberDara = new BehaviorSubject<any>(undefined);
  
  initializeMetaData(meta:any[]){
    this.collectionData.next(meta);
  }


  returnMetaData(){
    return this.collectionData;
  }


  getMember(ID:string){
    return this.returnMetaData().pipe(
      map(members =>
        members.find(member => member.ID === ID)),
      tap(member => this.memberDara.next(member))
    );
  }

  // getReference(ID:string, Ref:string){
  //   return this.getMember(ID).pipe(
  //     map(member =>
  //       member.References.find(member => member.ID === Ref))
  //   );
  // }
}
