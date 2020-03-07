import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { LoginToSaveService } from 'src/app/SharedComponentModules/login-to-save/login-to-save.service';

import { CharacterMetaData } from 'src/app/Classes/ContentClasses';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
@Component({
  selector: 'app-fan-characters',
  templateUrl: './fan-characters.component.html',
  styleUrls: ['./fan-characters.component.css']
})
export class FanCharactersComponent implements OnInit, OnDestroy {

  DatatoSave: CharacterMetaData;
  stream1: Subscription;

  constructor(private logintosaveserv: LoginToSaveService,
              private fetcher: FetchService,
              private auth: AuthService) { }

  ngOnInit() {
    this.logintosaveserv.assignType('FanCharacters');
    this.logintosaveserv.assignAutoTrigger(true);
    this.stream1 = this.logintosaveserv.reset.subscribe(() => {
      this.fetcher.assignItemtoEdit(undefined);
      this.logintosaveserv.assignStopClick(false);
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }

}
