import { Injectable }                         from '@angular/core';
import { HttpClient }                         from '@angular/common/http';

import { Observable }                         from 'rxjs';

import { FireBaseService }                    from 'src/app/GlobalServices/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class CRUD {

  constructor(private firebaseserv:FireBaseService,
              private httpclient:HttpClient) { }

  uploadImages(paths:string[], images:any[]){
    if(images[0]){
      let links = new Array<string>(paths.length);
      return Promise.all(images.map((event,index) => {//upload each image
        return this.firebaseserv.uploadImage(paths[index], event)
        .then(() => {return this.firebaseserv.returnImage(paths[index]).toPromise()})//return download link
        .then(url => {links[index]=url})
  
      })).then(() => {return links }) //return all links  
    }else{
      return Promise.resolve([undefined])
    }
  }

  editImages(paths:string[], newImages:any[], oldImages:any[]){
    let links = new Array<string>(paths.length);
    return Promise.all(newImages.map((event,index) => {
      
      if(!event){//change nothing!
        links[index] = oldImages[index];

      }else{//Delete old image and upload new image
        return this.removeOldImage(oldImages[index])//this.firebaseserv.deleteImage(oldImages[index]) //delete old image
        .then(() => {return this.firebaseserv.uploadImage(paths[index], event)})//upload new image
        .then(() => {return this.firebaseserv.returnImage(paths[index]).toPromise()})//return download link
        .then(url => {links[index]=url})
      }
    })).then(() => {return(links)}) //return all links
  }

  private removeOldImage(link:string){
    if(link){
      return this.firebaseserv.deleteImage(link);
    }else{
      return Promise.resolve(undefined)
    }
  }

  uploadItem(newDoc:any, path:string){
    return this.firebaseserv.uploadDocument(newDoc, path);
  }

  editItem(editDoc:any, path:string, docKey:string){
      return this.firebaseserv.editDocument(editDoc, path, docKey);
  }

  deleteItem(StorageUrls:string[]=[], docPath:string, docKey:string){
    return Promise.all(StorageUrls.map(pic =>{
      return this.firebaseserv.deleteImage(pic)
    })).then(()=>
      this.firebaseserv.deleteDocument(docPath, docKey)
    )
  }


  uploadWriting(newStory:any, path:string, text:Blob, blobPath:string, seriesData:any){
    return this.uploadBlob(text, blobPath, path, seriesData)
    .then(link=> {
      newStory.StoryLink = link;
      this.firebaseserv.uploadDocument(newStory, `${path}/${seriesData.ID}/${seriesData.ID}`)
    })
  }

  private uploadBlob(text:Blob, blobPath:string, path:string, seriesData:any){
    return this.firebaseserv.checkDir(path, seriesData).toPromise()//see if series folder exists
    .then(() =>{ return this.firebaseserv.uploadBlob(blobPath, text)//upload the text
    }).then(()=> { return this.firebaseserv.returnImage(blobPath).toPromise()//get the downloadlink
    })
  }

  editWriting(editStory:any, newPath:string, newText:Blob, newBlobPath:string, newSeriesData:any,
              oldStory:any, oldPath:string){
    return this.checkSeriesChange(editStory, oldStory, oldPath, newPath, newSeriesData)
    .then(() =>{ return this.checkBlob(newText, newBlobPath, oldStory.StoryLink)
    }).then(link=> {
      editStory.StoryLink = link;
      this.firebaseserv.editDocument(editStory, `${newPath}/${newSeriesData.ID}/${newSeriesData.ID}`, oldStory.key);
    })
  }

  private checkSeriesChange(editStory:any, oldStory:any, oldPath:string, newPath:string, newSeriesData:any){
    if(editStory.Type != oldStory.Type || editStory.Series != oldStory.Series){
      return Promise.all([
        this.firebaseserv.checkDir(newPath, newSeriesData).toPromise(),
        this.firebaseserv.deleteDocument(oldPath, oldStory.key)
      ])
    }else{
      return Promise.resolve(undefined)
    }
  }

  private checkBlob(newText:Blob, newBlobPath:string, oldBlobLink:string){
    if(!newText){//change nothing!
      return oldBlobLink;
    }else{
      return this.firebaseserv.deleteImage(oldBlobLink) //delete old text
      .then(() => {return this.firebaseserv.uploadBlob(newBlobPath, newText) //upload new text
      }).then(() =>  {return this.firebaseserv.returnImage(newBlobPath).toPromise()}) //get link
    }
  }


  getText(link:string): Observable<string>{
    return this.httpclient.get(link, {responseType: 'text'})
  }
}
