import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription }                 from 'rxjs';

import { SA }                           from 'src/app/Classes/ContentClasses';
import { AuthService }                  from 'src/app/administration/security/Auth/auth.service';
import { FetchService }                 from 'src/app/GlobalServices/fetch.service';
import { GeneralcollectionService }     from 'src/app/GlobalServices/generalcollection.service';
import { LoginToSaveService }           from 'src/app/SharedComponentModules/login-to-save/login-to-save.service';

@Component({
  selector: 'app-source-calc-frame',
  templateUrl: './source-calc-frame.component.html',
  styleUrls: ['./source-calc-frame.component.css']
})

export class SourceCalcFrameComponent implements OnInit, OnDestroy {

  canonSA: SA[]
  loggedIn: boolean;
  notValid: boolean;
  stream1: Subscription;
  stream2: Subscription;

  constructor(private generalcollectserv: GeneralcollectionService,
              private logintosaveserv: LoginToSaveService,
              private fetcher: FetchService,
              private auth: AuthService) { }

  ngOnInit() {
    this.canonSA = this.generalcollectserv.collectionData.value
    .sort((a,b) => a.ID > b.ID ? 1 : -1);
    this.logintosaveserv.assignType('SAcalculations');

    this.stream1 = this.auth.user.subscribe(() => 
      this.loggedIn = this.auth.isUser());  
    this.stream2 =this.logintosaveserv.reset.subscribe(() => {
      this.fetcher.assignItemtoEdit(undefined);
      this.logintosaveserv.assignStopClick(false);
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.generalcollectserv.dispose();
  }

  populateForm(index: number) {
    this.fetcher.assignItemtoEdit(this.canonSA[index]);
  }

}
