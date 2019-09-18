import { Injectable }                   from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { map }                          from 'rxjs/operators';
import { BehaviorSubject, Observable }  from 'rxjs';

import { FireBaseService }              from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class EditService {

  itemType = new BehaviorSubject<string>('');
  itemToEdit = new BehaviorSubject<any>(undefined);
  allowDelete = new BehaviorSubject<boolean>(false);
  allowEditAll = new BehaviorSubject<boolean>(false);

  constructor(private firebaseserv: FireBaseService) { }
  
  assignItemType(itemType: string){
    return this.itemType.next(itemType);
  }

  getItemType(){
    return this.itemType;
  }

  getEditableCollection(path:string): Observable<any[]>{
      return this.firebaseserv.returnCollectionWithKeys(path).pipe(
        map(collect =>
          collect.sort((a,b) => a.ID > b.ID ? 1:-1)
    ));
  }

  assignEditItem(item:any){
    return this.itemToEdit.next(item);
  }
  
  quickAssign(Form:FormGroup, edit:any): FormGroup{
    Object.keys(Form.controls).forEach(key =>{
      if(typeof(Form.controls[key].value) !== "object"){
        if(edit[key] !== undefined){
          Form.controls[key].patchValue(edit[key]);
        }else{
          Form.controls[key].patchValue('');
        }
      }});
    return Form;
  }

}
