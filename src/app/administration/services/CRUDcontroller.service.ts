import { Injectable }                   from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { map, take, tap }                          from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, of }  from 'rxjs';

import { FireBaseService }              from 'src/app/GlobalServices/firebase.service';
import { FirebasePaths } from 'src/app/Classes/FirebasePaths';
import { CRUD } from './CRUD.service';

@Injectable({
  providedIn: 'root'
})

export class CRUDcontrollerService {

  firePaths = new FirebasePaths;
  allowButtons = new BehaviorSubject<ButtonController>(new ButtonController([true, true, false, false]))
  itemType = new BehaviorSubject<string>('');
  itemToEdit = new BehaviorSubject<any>(undefined);
  itemList = new BehaviorSubject<any[]>(undefined);
  
  //activeFormData is: form data[0], new image paths[1], new images[2],
  //old image paths[3], text path[4], new text[5], old  text path [6] 
  activeFormData = new BehaviorSubject<any>(undefined);
  
  message = new BehaviorSubject<string>(undefined);
  triggerProcess = new Subject<any>();

  constructor(private firebaseserv: FireBaseService,
              private crud: CRUD) { }
  
  //Data fetching functions
  assignItemType(itemType: string) {
    return this.itemType.next(itemType);
  }

  getItemType() {
    return this.itemType;
  }

  getEditableCollection(path: string): Observable<any[]>{
      return this.firebaseserv.returnCollectionWithKeys(path).pipe(
        map(collect =>
          collect.sort((a,b) => a.ID > b.ID ? 1:-1),
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

  assignItemList(path: string) {
    return this.getEditableCollection(path).subscribe(collect => {
      this.itemList.next(collect)
    });
  }

  getText(link: string){
    return this.crud.getText(link);
  }




  //Key upload/download functions
  onSubmit() {
    const buttonState = this.allowButtons.value;
    this.allowButtons.next(new ButtonController([false, false, false, false]));

    this.message.next("Processing...");
    this.triggerProcess.next();
    this.activeFormData.pipe(take(1)).subscribe(data =>{
  
      //submit button hit with invalid form.
      if(data[0] === "abort"){
        this.message.next(data[1]);
        this.allowButtons.next(buttonState);
        return;
      }

      this.message.next("Submitting...");
      let meta = data[0];
      const images = [data[1], data[2], data[3]];
      const story = [data[4], data[5], data[6]];
      console.log("images");
      this.crud.uploadImages(images[0], images[1])
      .then(links => {
        meta = this.checkLinks(meta, links);
        console.log("Text");
        return this.crud.uploadStory(story[0], story[1])       
      }).then(link =>{
        if("StoryLink" in meta){
          meta.StoryLink = link;
        }
        console.log("meta");
        return this.crud.uploadItem(meta, this.firePaths[this.itemType.value]);
      }).then(() => {
        this.itemToEdit.next(undefined);
        this.message.next("Submitted!");
        this.allowButtons.next(buttonState);
      }).catch(err => {
        console.log(meta)
        this.throwError(err, buttonState);
      });
    });
  }

  async onEdit(all: boolean = false): Promise<any> {
    const buttonState = this.allowButtons.value;
    this.allowButtons.next(new ButtonController([false, false, false, false]));
    let meta: any;
    let story: any[];
    let images: any[];

    this.message.next("Processing...");
    this.triggerProcess.next();

    return this.activeFormData.pipe(take(1)).toPromise()
    .then(data => {
      this.message.next("Editing...");
      console.log(data);
      meta = data[0];
      images = [data[1], data[2], data[3]];
      story = [data[4], data[5], data[6]];
      console.log("images");
      return this.crud.editImages(images[0], images[1], images[2])
    }).then(links => {
      meta = this.checkLinks(meta, links);
      console.log("text");
      return this.crud.editStory(story[0], story[1], story[2])       
    }).then(link =>{
      if("StoryLink" in meta){
        meta.StoryLink = link;
      }
      console.log("meta");
      return this.crud.editItem(meta,
              this.firePaths[this.itemType.value],
              this.itemToEdit.value.key);
    }).then(() =>{
      this.itemToEdit.next(undefined);
      this.message.next("Edit successful!");
      this.allowButtons.next(buttonState);
    }).catch(err => {
      this.throwError(err, buttonState);
      console.log(meta)
      if(all){
        return Promise.reject();
      }
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
    this.crud.deleteItem(links, this.firePaths[this.itemType.value], item.key)
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

      return this.updateLoop(this.itemList.value).then(() => {      
      this.message.next("All entries updated!");
      this.allowButtons.next(buttonState);
      }).catch(() => this.allowButtons.next(buttonState));
  }

  async updateLoop(collect: any[]) {
    for (const member of collect){
      this.itemToEdit.next(member);
      await this.onEdit(true).catch(() => Promise.reject());
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

  checkLinks(meta: any, links: string[]){
    if("Links" in meta){
      if(links[0]){
        meta.Links = links;
      }else{
        delete meta.Links;
      }
    }
    return(meta);
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
