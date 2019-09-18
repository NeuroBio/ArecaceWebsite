import { Injectable }                   from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { map, take, tap }                          from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject }  from 'rxjs';

import { FireBaseService }              from 'src/app/GlobalServices/firebase.service';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';
import { CRUD } from './CRUD.service';

@Injectable({
  providedIn: 'root'
})

export class CRUDcontrollerService {

  fileHierarchy = new FileHierarchy;

  allowDelete = new BehaviorSubject<boolean>(false);
  allowEditAll = new BehaviorSubject<boolean>(false);

  itemType = new BehaviorSubject<string>('');
  itemToEdit = new BehaviorSubject<any>(undefined);
  //activeFormData is: form data[0], new images[1], new paths[2], old paths[3]
  activeFormData = new BehaviorSubject<any>(undefined);
  message = new BehaviorSubject<string>(undefined);

  triggerProcess = new Subject<any>();

  constructor(private firebaseserv: FireBaseService,
              private crud: CRUD) { }
  
  assignItemType (itemType: string) {
    return this.itemType.next(itemType);
  }

  getItemType () {
    return this.itemType;
  }

  getEditableCollection (path: string): Observable<any[]>{
      return this.firebaseserv.returnCollectionWithKeys(path).pipe(
        map(collect =>
          collect.sort((a,b) => a.ID > b.ID ? 1:-1)
    ));
  }

  assignEditItem (item: any) {
    return this.itemToEdit.next(item);
  }
  
  quickAssign (Form: FormGroup, edit: any): FormGroup{
    Object.keys(Form.controls).forEach(key =>{
      if(typeof(Form.controls[key].value) !== "object"){
        if(edit[key] !== undefined){
          Form.controls[key].patchValue(edit[key]);
        }else{
          Form.controls[key].patchValue('');
        }
      }
    });
    return Form;
  }




  //Key upload/download functions
  onSubmit(){
    this.message.next("Processing...");
    this.triggerProcess.next();

    this.activeFormData.pipe(take(1)).subscribe(data =>{
      this.message.next("Submitting...");
      //data array is: form data[0], images[1], then paths[2]
      const meta = data[0];
      this.crud.uploadImages(data[2], data[1])
      .then( links => {
        meta.Links = links;
        return this.crud.uploadItem(meta, this.fileHierarchy[this.itemType.value].Path);
      }).then( () => {
        this.itemToEdit.next(undefined);
        this.message.next("Submitted!");
      });
    });
  }

  onEdit(){
    this.message.next("Processing...");
    this.triggerProcess.next();

    this.activeFormData.pipe(take(1)).subscribe(data =>{
      this.message.next("Submitting...");
      const meta = data[0];
      this.crud.editImages(data[2], data[1], data[3])
      .then( links => {
        meta.Links = links;
        return this.crud.uploadItem(meta, this.fileHierarchy[this.itemType.value].Path);
      }).then(() =>{
        this.itemToEdit.next(undefined);
        this.message.next("Submitted!");
      });
    });
  }

  onDelete(){
    this.message.next('Hold on, deleting...');
    this.crud.deleteItem(this.itemToEdit.value.Links,
      this.fileHierarchy[this.itemType.value].Path,
      this.itemToEdit.value.key)
    .then(() =>
        this.message.next('Delete successful!')
    );
  }

  onUpdateAll() {
    this.getEditableCollection(this.fileHierarchy[this.itemType.value].Path)
    .subscribe(collect =>{
        collect.forEach(member => {
        this.itemToEdit = member;
        this.onSubmit();
      });
    })
  }

}
