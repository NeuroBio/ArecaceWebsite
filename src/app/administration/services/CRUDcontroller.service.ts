import { Injectable }                   from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { map, take, tap }                          from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, of }  from 'rxjs';

import { FireBaseService }              from 'src/app/GlobalServices/firebase.service';
import { FileHierarchy } from 'src/app/Classes/filehierarchy';
import { CRUD } from './CRUD.service';

@Injectable({
  providedIn: 'root'
})

export class CRUDcontrollerService {

  fileHierarchy = new FileHierarchy;

  allowButtons = new BehaviorSubject<ButtonController>(new ButtonController([true, true, false, false]))
  // allowDelete = new BehaviorSubject<boolean>(false);
  // allowUpdateAll = new BehaviorSubject<boolean>(false);
  // allowReset = new BehaviorSubject<boolean>(false);
  // allowSubmit = new BehaviorSubject<boolean>(false);

  itemType = new BehaviorSubject<string>('');
  itemToEdit = new BehaviorSubject<any>(undefined);
  //activeFormData is: form data[0], new image paths[1], new images[2],
  //old image paths[3], text path[4], new text[5], old  text path [6] 
  activeFormData = new BehaviorSubject<any>(undefined);
  message = new BehaviorSubject<string>(undefined);

  triggerProcess = new Subject<any>();

  constructor(private firebaseserv: FireBaseService,
              private crud: CRUD) { }
  
  //Data fetchgin functions
  assignItemType(itemType: string) {
    return this.itemType.next(itemType);
  }

  getItemType() {
    return this.itemType;
  }

  getEditableCollection(path: string): Observable<any[]>{
      return this.firebaseserv.returnCollectionWithKeys(path).pipe(
        map(collect =>
          collect.sort((a,b) => a.ID > b.ID ? 1:-1)
    ));
  }

  assignEditItem(item: any) {
    return this.itemToEdit.next(item);
  }
  
  quickAssign(Form: FormGroup, edit: any): FormGroup{
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
  onSubmit() {
    const buttonState = this.allowButtons.value;
    this.allowButtons.next(new ButtonController([false, false, false, false]));

    this.message.next("Processing...");
    this.triggerProcess.next();
    this.activeFormData.pipe(take(1)).subscribe(data =>{
  
      //submit button hit with invalid form.
      if(data === "abort"){
        this.message.next("An image is required.");
        this.allowButtons.next(buttonState);
        return;
      }
      this.message.next("Submitting...");
      const meta = data[0];
      this.crud.uploadImages(data[1], data[2])
      .then(links => {
        if("Links" in meta){
          meta.Links = links;
        }
        return this.crud.uploadStory(data[3], data[4])       
      }).then(link =>{
        if("StoryLink" in meta){
          meta.StorkLink = link;
        }
        return this.crud.uploadItem(meta, this.fileHierarchy[this.itemType.value].Path);
      }).then(() => {
        this.itemToEdit.next(undefined);
        this.message.next("Submitted!");
        this.allowButtons.next(buttonState);
      }).catch(err => {
        this.throwError(err, buttonState);
      });
    });
  }

  async onEdit(): Promise<any>{
    const buttonState = this.allowButtons.value;
    this.allowButtons.next(new ButtonController([false, false, false, false]));
    let meta: any;
    let story: any[];

    this.message.next("Processing...");
    this.triggerProcess.next();

    return this.activeFormData.pipe(take(1)).toPromise()
    .then(data => {
      this.message.next("Editing...");
      meta = data[0];
      story = [data[4], data[5], data[6]]
      return this.crud.editImages(data[1], data[2], data[3])
    }).then(links => {
      if("Links" in meta){
        meta.Links = links;
      }
      return this.crud.editStory(story[0], story[1], story[2])       
    }).then(link =>{
      if("StoryLink" in meta){
        meta.StorkLink = link;
      }
      return this.crud.editItem(meta,
              this.fileHierarchy[this.itemType.value].Path,
              this.itemToEdit.value.key);
    }).then(() =>{
      this.itemToEdit.next(undefined);
      this.message.next("Edit successful!");
      this.allowButtons.next(buttonState);
    }).catch(err => {
      this.throwError(err, buttonState);
      return Promise.reject();
    });
  }

  onDelete() {
    const buttonState = this.allowButtons.value;
    this.allowButtons.next(new ButtonController([false, false, false, false]));
    this.message.next('Hold on, deleting...');
    const item = this.itemToEdit.value
    
    const links = [];
    if("Links" in item){
      item.Links.forEach(link => links.push(link));
    }
    if("StoryLink" in item){
      links.push(item.StoryLink);
    }
    this.crud.deleteItem(links, this.fileHierarchy[this.itemType.value].Path, item.key)
    .then(() => {
        this.itemToEdit.next(undefined);
        this.message.next('Delete successful!')
        this.allowButtons.next(buttonState);
    }).catch(err => {
        this.throwError(err, buttonState);
    });
  }

  onUpdateAll() {
    const buttonState = this.allowButtons.value;
    this.allowButtons.next(new ButtonController([false, false, false, false]));

    this.getEditableCollection(this.fileHierarchy[this.itemType.value].Path)
    .pipe(take(1)).subscribe( collect =>{
      return this.updateLoop(collect).then(() => {      
      this.message.next("All entries updated!");
      this.allowButtons.next(buttonState);
      }).catch(() => this.allowButtons.next(buttonState));
    });
  }

  async updateLoop(collect: any[]) {
    for (const member of collect){
      this.itemToEdit.next(member);
      await this.onEdit().catch(() => Promise.reject());
    }
  }

  throwError(err: any, button: ButtonController) {
    this.message.next(`Execution Failed
                      Stage: ${err.stage}
                      Error: ${err.message}`);
    this.allowButtons.next(button);
  }

  updateButton(which: string, to: boolean){
    const buttonState = this.allowButtons.value;
    buttonState[which] = to;
    this.allowButtons.next(buttonState);
  }

}

export class ButtonController {
  submit: boolean;
  reset: boolean;
  delete: boolean;
  updateAll: boolean;
  constructor(bool: boolean[]){
    this.submit = bool[0];
    this.reset = bool[1];
    this.delete = bool[2];
    this.updateAll = bool[3];
  }
}
