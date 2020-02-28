import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { Observable } from 'rxjs';
import { SA } from 'src/app/Classes/ContentClasses';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/administration/security/Auth/auth.service';
import { FetchService } from 'src/app/GlobalServices/fetch.service';
import { GeneralcollectionService } from 'src/app/GlobalServices/generalcollection.service';

@Component({
  selector: 'app-source-calc-frame',
  templateUrl: './source-calc-frame.component.html',
  styleUrls: ['./source-calc-frame.component.css']
})
export class SourceCalcFrameComponent implements OnInit {

  DatatoSave: any;
  canonSA: SA[]
  loggedIn: boolean;

  constructor(private generalcollectserv: GeneralcollectionService,
              private fetcher: FetchService,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(() => {console.log(this.auth.isLoggedIn);
      this.loggedIn = this.auth.isLoggedIn})//.isUser());
    this.canonSA = this.generalcollectserv.collectionData.value
      .sort((a,b) => a.ID > b.ID ? 1 : -1);
      this.fetcher.activeFormData.subscribe(userData => { console.log(userData);
        this.DatatoSave = userData[0]});
  }

  populateForm(index: number) {
    this.fetcher.assignIntemtoEdit(this.canonSA[index]);
  }

}
