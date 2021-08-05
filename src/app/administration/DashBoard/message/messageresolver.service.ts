import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { zip } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class MessageresolverService implements Resolve<any> {

  constructor(
    private firebaseserv: FireBaseService,
    private messageserv: MessageService
  ) { }

  resolve() {
    const new$ = this.firebaseserv.returnCollectionWithKeys('Contact');
    const old$ = this.firebaseserv.returnCollectionWithKeys('ContactSaved');
    return zip(new$,old$).pipe(
      take(1),
      tap(data => this.messageserv.initilizeData(data))
    );
  }

}
