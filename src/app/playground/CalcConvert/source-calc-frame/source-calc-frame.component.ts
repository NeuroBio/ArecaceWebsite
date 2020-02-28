import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { Observable } from 'rxjs';
import { SA } from 'src/app/Classes/ContentClasses';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';
import { LoginToSaveService } from 'src/app/SharedComponentModules/login-to-save/login-to-save.service';
@Component({
  selector: 'app-source-calc-frame',
  templateUrl: './source-calc-frame.component.html',
  styleUrls: ['./source-calc-frame.component.css']
})
export class SourceCalcFrameComponent implements OnInit {

  DatatoSave: any;
  canonSA: SA[]
  loggedIn: boolean;
  notValid: boolean;

  constructor(private generalcollectserv: GeneralcollectionService,
              private logintosaveserv: LoginToSaveService,
              private fetcher: FetchService,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(() => 
      this.loggedIn = this.auth.isLoggedIn)//.isUser());
    this.canonSA = this.generalcollectserv.collectionData.value
      .sort((a,b) => a.ID > b.ID ? 1 : -1);
    this.fetcher.activeFormData.subscribe(userData => {
      if(userData) 
        this.DatatoSave = userData[0];
    });
    this.fetcher.valid.subscribe(valid => this.notValid = !valid);
    this.logintosaveserv.reset.subscribe(() => {
      this.fetcher.assignIntemtoEdit(undefined);
      this.logintosaveserv.assignStopClick(false);
    });
  }

  populateForm(index: number) {
    this.fetcher.assignIntemtoEdit(this.canonSA[index]);
  }

}
