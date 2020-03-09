import { Injectable }                           from '@angular/core';

import { map, take }                            from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject,
         Subscription}                          from 'rxjs';

import { FireBaseService }                      from 'src/app/GlobalServices/firebase.service';
import { CRUD }                                 from './CRUD.service';
import { ButtonController }                     from '../../SharedComponentModules/SharedForms/Buttons/buttoncontroller';
import { NewestCueService }                     from './newest-cue.service';
import { FetchService }                         from 'src/app/GlobalServices/fetch.service';
import { CacheService }                         from 'src/app/GlobalServices/cache.service';

import { CRUDdata }                             from 'src/app/Classes/ContentClasses';
import { AllPathInfo }                          from 'src/app/Classes/UploadDownloadPaths';

@Injectable({
  providedIn: 'root'
})

export class CRUDcontrollerService {
  
  firePaths = new AllPathInfo();
  itemType = new BehaviorSubject<string>('');
  itemToEdit = new BehaviorSubject<any>(undefined);
  itemList = new BehaviorSubject<any[]>(undefined);
  
  showButtons = new BehaviorSubject<ButtonController>(undefined);
  allowButtons = new BehaviorSubject<ButtonController>(new ButtonController([true, true, false, false]));
  ButtonSavedState = new BehaviorSubject<ButtonController>(undefined);

  activeFormData = new BehaviorSubject<CRUDdata>(undefined);
  
  message = new BehaviorSubject<string>(undefined);
  triggerProcess = new Subject<any>();

  stream: Subscription;

  constructor(private firebaseserv: FireBaseService,
              private crud: CRUD,
              private newestCue: NewestCueService,
              private fetcher: FetchService,
              private cache: CacheService) {
    this.stream = this.fetcher.loading.subscribe(load => {
      if(load === true) {
       this.deActivateButtons();
      } else if(load === false) {
        this.reActivateButtons();
      }
    })
  }

  //Data fetching functions
  assignItemType(itemType: string) {
    return this.itemType.next(itemType);
  }

  assignEditItem(item: any) {
    return this.itemToEdit.next(item);
  }

  assignItemList(path: string) {
    if(path) {
      if(this.cache.Cache[`${this.itemType.value}-edit`]) {
        this.cache.Cache[`${this.itemType.value}-edit`]
        .subscribe(list => this.itemList.next(list));
      } else {
        // this.cache.addSubscription(`${this.itemType.value}-edit`, this.getEditableCollection(path));
        return this.getEditableCollection(path).subscribe(collect => {
          this.itemList.next(collect);
        });
      }
    } else {
      this.itemList.next(undefined);
    }
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
    return this.activeFormData.pipe(take(1))
    .subscribe((data:CRUDdata) => {
      
      //submit button hit with invalid form.
      if(data.Abort) {
        return this.throwError({stage: 'Processing', message: data.AbortMessage})
      }

      this.message.next("Submitting...");console.log("images");
//IMAGES
      this.crud.uploadImages(data.NewImageLinks, data.ImageBlobs)
//TEXT
      .then(links => {console.log("Text");
        data.MetaData = this.checkLinks(data.MetaData, links);
        return this.crud.uploadStory(data.NewTextPath, data.TextBlob)       
//META DATA
      }).then(link => {console.log("meta");
        if("StoryLink" in data.MetaData) {
          data.MetaData.StoryLink = link;
        }
        this.newestCue.updateCue(
          Object.assign({}, data.MetaData),
          this.itemType.value, 'Created');
        return this.crud.uploadItem(data.MetaData, this.firePaths[this.itemType.value].Fire);
//POST UPLOAD
      }).then(() => {
        this.itemToEdit.next(undefined);
        this.message.next("Submitted!");
        this.reActivateButtons();
//ERRORS
      }).catch(err => {console.log(data.MetaData);
        this.throwError(err);
      });
    });
  }

  async onEdit(all: boolean = false): Promise<any> {
    this.deActivateButtons();
    this.message.next("Processing...");
    let CRUDdata: CRUDdata;

    this.triggerProcess.next();
    return this.activeFormData.pipe(take(1)).toPromise()
    .then(data => {console.log("images");
      if(data.Abort) {
        this.throwError({stage: 'Processing', message: data.AbortMessage});
        return Promise.reject();
      }

//IMAGES
      this.message.next("Editing...");
      CRUDdata = data;
      return this.crud.editImages(CRUDdata.NewImageLinks,
        CRUDdata.ImageBlobs, CRUDdata.OldImageLinks);
//TEXT
    }).then(links => {console.log("text");
      CRUDdata.MetaData = this.checkLinks(CRUDdata.MetaData, links);
      return this.crud.editStory(CRUDdata.NewTextPath,
        CRUDdata.TextBlob, CRUDdata.OldTextPath);      
//META DATA
    }).then(link =>{console.log("meta");
      if("StoryLink" in CRUDdata.MetaData){
        CRUDdata.MetaData.StoryLink = link;
      }
      this.newestCue.updateCue(
        Object.assign({}, CRUDdata.MetaData),
        this.itemType.value, 'Edited');
      return this.crud.editItem(CRUDdata.MetaData,
              this.firePaths[this.itemType.value].Fire,
              this.itemToEdit.value.key);
//POST UPLOAD
    }).then(() => {
      if(this.itemType.value !== 'Website') {
        this.itemToEdit.next(undefined);
      }
      this.message.next("Edit successful!");
      this.reActivateButtons();
//ERRORS
    }).catch(err => {console.log(CRUDdata.MetaData)
      this.throwError(err);
      if(all) {
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

    this.newestCue.updateCue(
      Object.assign({}, this.itemToEdit.value),
      this.itemType.value, 'Deleted');
    this.crud.deleteItem(links, this.firePaths[this.itemType.value].Fire, item.key)
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
    this.allowButtons.next(new ButtonController([false, false, false, false]));
  }

  reActivateButtons() {
    this.allowButtons.next(this.ButtonSavedState.value);
  }

  disposal() {
    this.message.next('');
  }

  shutDown() {
    if(this.stream) {
      this.stream.unsubscribe();
    }
  }
}
