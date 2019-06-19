import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralcollectionService {

  metaData = new BehaviorSubject<any[]>([0]);
  
  initializeMetaData(meta:any[]){
    this.metaData.next(meta);
  }


  returnMetaData(){
    return this.metaData;
  }


  getMember(ID:string){
    return this.returnMetaData().pipe(
      map(members =>
        members.find(member => member.ID === ID))
    );
  }

  getReference(ID:string, Ref:string){
    return this.getMember(ID).pipe(
      map(member =>
        member.References.find(member => member.ID === Ref))
    );
  }
}
