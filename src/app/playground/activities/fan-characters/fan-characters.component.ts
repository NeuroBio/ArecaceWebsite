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
    this.logintosaveserv.assignUserDataInfo(['FirstName', 'LastName'], 'FanCharacters');
    this.logintosaveserv.assignAutoTrigger(true);
    this.logintosaveserv.trigger.subscribe(() => {
      this.fixLinks();
    });
    this.stream1 = this.logintosaveserv.reset.subscribe(() => {
      this.fetcher.assignItemtoEdit(undefined);
      this.logintosaveserv.assignStopClick(false);
    });
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
  }


  fixLinks() {
    return this.fetcher.activeFormData.pipe(take(1)).subscribe(FanChar => {
      FanChar[1] = FanChar[1].map(link =>
        `UserData/${this.auth.uid.value}/${link.split('/')[1]}`);
      this.fetcher.assignActiveFormData(FanChar);
    });
  }
}
