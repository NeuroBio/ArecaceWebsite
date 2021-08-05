import { Injectable } from '@angular/core';
import { FireBaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class TextProvider {

  WebsiteText: any[];

  constructor(private firebaseserv: FireBaseService) { }

  load() {
    return new Promise((resolve) => {
      this.firebaseserv.returnCollect('WebsiteText')
      .subscribe(text => {
        if (text) {
          this.WebsiteText = text;
          resolve(true);
        }
      });
    });
  }
}
