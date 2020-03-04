import { Injectable }                           from '@angular/core';
import { FormGroup }                            from '@angular/forms';

import { map, take, skip }                            from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FireBaseService }                      from 'src/app/GlobalServices/firebase.service';
import { CRUD }                                 from './CRUD.service';
import { ButtonController }                     from '../../SharedComponentModules/SharedForms/Buttons/buttoncontroller';
import { NewestCueService }                     from './newest-cue.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';

@Injectable({
  providedIn: 'root'
})

export class CRUDcontrollerService {
  
  firePaths = new BehaviorSubject<any>(undefined);
  itemType = new BehaviorSubject<string>('');
  itemToEdit = new BehaviorSubject<any>(undefined);
  itemList = new BehaviorSubject<any[]>(undefined);
  
  showButtons = new BehaviorSubject<ButtonController>(undefined);
  allowButtons = new BehaviorSubject<ButtonController>(new ButtonController([true, true, false, false]));
  ButtonSavedState = new BehaviorSubject<ButtonController>(undefined);


  activeFormData = new BehaviorSubject<any>(undefined);
  //activeFormData is: form data[0], new image paths[1], new images[2],
  //old image paths[3], text path[4], new text[5], old  text path [6]
  
  message = new BehaviorSubject<string>(undefined);
  triggerProcess = new Subject<any>();

  constructor(private firebaseserv: FireBaseService,
              private crud: CRUD,
              private newestCue: NewestCueService,
              private fetcher: FetchService) {
    this.fetcher.loading.subscribe(load => {
      if(load === true) {
       this.deActivateButtons();
      } else if(load === false) {
        this.reActivateButtons();
      }
    })
  
  }

  
            
  //Data fetching functions
  assignFirePaths(paths: any, itemType: string = '') {
    this.firePaths.next(paths);
    this.itemType.next(itemType);
  }

  assignItemType(itemType: string) {
    return this.itemType.next(itemType);
  }

  assignEditItem(item: any) {
    return this.itemToEdit.next(item);
  }

  assignItemList(path: string) {
    return this.getEditableCollection(path).subscribe(collect => {
      this.itemList.next(collect);
    });
  }

  getItemType() {
    return this.itemType;
  }

  getEditableCollection(path: string): Observable<any[]> {
    return this.firebaseserv.returnCollectionWithKeys(path).pipe(
      map(collect =>
        collect.sort((a,b) => a.ID > b.ID ? 1:-1),
    ));
  }
 
  getText(link: string) {
    return this.crud.getText(link);
  }


  //Key upload/download functions
  onSubmit() {
    this.deActivateButtons()

    this.message.next("Processing...");
    this.triggerProcess.next();
    return this.activeFormData.pipe(take(1)).subscribe(data => {
      console.log("CRUDcontroller")
      //submit button hit with invalid form.
      if(data[0] === "abort") {
        this.message.next(data[1]);
        this.reActivateButtons()
        return;
      }

      this.message.next("Submitting...");
      let meta = data[0];
      const images = [data[1], data[2], data[3]];
      const story = [data[4], data[5], data[6]];

//IMAGES
      console.log("images");
      this.crud.uploadImages(images[0], images[1])
//TEXT
      .then(links => {
        meta = this.checkLinks(meta, links);
        console.log("Text");
        return this.crud.uploadStory(story[0], story[1])       
//META DATA
      }).then(link => {
        if("StoryLink" in meta) {
          meta.StoryLink = link;
        }
        this.newestCue.updateCue(Object.assign({}, meta), this.itemType.value, 'NOT READY YET');
        console.log("meta");
        return this.crud.uploadItem(meta, this.firePaths.value[this.itemType.value]);
//POST UPLOAD
      }).then(() => {
        this.itemToEdit.next(undefined);
        this.message.next("Submitted!");
        this.reActivateButtons();
//ERRORS
      }).catch(err => {
        console.log(meta)
        this.throwError(err);
        this.reActivateButtons();
      });
    });
  }

  async onEdit(all: boolean = false): Promise<any> {
    this.deActivateButtons();

    let meta: any;
    let story: any[];
    let images: any[];

    this.message.next("Processing...");
    this.triggerProcess.next();

    return this.activeFormData.pipe(take(1)).toPromise()
//IMAGES
    .then(data => {
      this.message.next("Editing...");
      console.log(data);
      meta = data[0];
      images = [data[1], data[2], data[3]];
      story = [data[4], data[5], data[6]];
      console.log("images");
      return this.crud.editImages(images[0], images[1], images[2])
//TEXT
    }).then(links => {
      meta = this.checkLinks(meta, links);
      console.log("text");
      return this.crud.editStory(story[0], story[1], story[2])       
//META DATA
    }).then(link =>{
      if("StoryLink" in meta){
        meta.StoryLink = link;
      }
      console.log("meta");
      return this.crud.editItem(meta,
              this.firePaths.value[this.itemType.value],
              this.itemToEdit.value.key);
//POST UPLOAD
    }).then(() => {
      if(this.itemType.value !== 'Website') {
        this.itemToEdit.next(undefined);
      }
      this.message.next("Edit successful!");
      this.reActivateButtons()
//ERRORS
    }).catch(err => {
      this.throwError(err);
      console.log(meta)
      if(all){
        return Promise.reject();
      }
    });
  }

  onDelete() {
    this.deActivateButtons()
    this.message.next('Hold on, deleting...');
    const item = this.itemToEdit.value;
    
    const links = [];
    if("Links" in item) {
      item.Links.forEach(link => links.push(link));
    }

    if("StoryLink" in item) {
      links.push(item.StoryLink);
    }

    this.crud.deleteItem(links, this.firePaths.value[this.itemType.value], item.key)
    .then(() => {
        this.itemToEdit.next(undefined);
        this.message.next('Delete successful!')
        this.reActivateButtons();
    }).catch(err => {
        this.throwError(err);
    });
  }

  onUpdateAll() {
    this.deActivateButtons();

    return this.updateLoop(this.itemList.value).then(() => {
      this.message.next("All entries updated!");
      this.reActivateButtons();
      }).catch(() => this.reActivateButtons());
  }

  async updateLoop(collect: any[]) {
    for (const member of collect) {
      this.itemToEdit.next(member);
      await this.onEdit(true).catch(() => Promise.reject());
    }
  }

  checkLinks(meta: any, links: string[]) {
    if("Links" in meta) {
      if(links[0]) {
        meta.Links = links;
      } else {
        delete meta.Links;
      }
    }
    return(meta);
  }

  throwError(err: any) {
    this.message.next(`Execution Failed
                      Stage: ${err.stage}
                      Error: ${err.message}`);
    this.reActivateButtons();
  }


  // Button control functions
  assignButtons(states: boolean[]) {
    this.showButtons.next(new ButtonController(states));
  }

  updateButton(which: string, to: boolean) {
    const buttonState = this.allowButtons.value;
    buttonState[which] = to;
    this.allowButtons.next(buttonState);
  }

  deActivateButtons() {
    this.ButtonSavedState.next(this.allowButtons.value);
    console.log("here")
    this.allowButtons.next(new ButtonController([false, false, false, false]));
  }

  reActivateButtons() {
    console.log(this.ButtonSavedState.value)
    this.allowButtons.next(this.ButtonSavedState.value);
  }

  disposal() {
    this.message.next('');
  }
}
