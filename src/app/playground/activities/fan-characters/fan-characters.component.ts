import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { LoginToSaveService } from 'src/app/SharedComponentModules/login-to-save/login-to-save.service';

import { CharacterMetaData } from 'src/app/Classes/ContentClasses';

@Component({
  selector: 'app-fan-characters',
  templateUrl: './fan-characters.component.html',
  styleUrls: ['./fan-characters.component.css']
})
export class FanCharactersComponent implements OnInit, OnDestroy {

  DatatoSave: CharacterMetaData;
  notValid: boolean;

  stream1: Subscription;
  stream2: Subscription;
  stream3: Subscription;

  constructor(private logintosaveserv: LoginToSaveService,
              private fetcher: FetchService) { }

  ngOnInit() {
    this.stream1 = this.fetcher.activeFormData.subscribe(userData => {
      if(userData) 
        this.DatatoSave = userData[0];
    });
    this.stream2 = this.fetcher.valid.subscribe(valid => this.notValid = !valid);
    this.stream3 =this.logintosaveserv.reset.subscribe(() => {
      this.fetcher.assignIntemtoEdit(undefined);
      this.logintosaveserv.assignStopClick(false);
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
    this.stream3.unsubscribe();
  }

}
