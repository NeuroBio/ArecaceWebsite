import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/GlobalServices/firebase.service';
import { Observable } from 'rxjs';
import { SA } from 'src/app/Classes/SAclass';
import { map, take, tap } from 'rxjs/operators';
import { CRUDcontrollerService } from 'src/app/administration/services/CRUDcontroller.service';

@Component({
  selector: 'app-source-calc-frame',
  templateUrl: './source-calc-frame.component.html',
  styleUrls: ['./source-calc-frame.component.css']
})
export class SourceCalcFrameComponent implements OnInit {

  canonSA: SA[]
  constructor(private firebaseserv: FireBaseService,
              private controller: CRUDcontrollerService) { }

  ngOnInit() {
    this.firebaseserv.returnCollect('SourceAffinities')
      .pipe(take(1)).subscribe(SAs => {
        SAs = SAs.sort((a,b) => a.ID > b.ID ? 1 : -1);
        this.canonSA = SAs;
    })
  }

  populateForm(index: number) {
    this.controller.assignEditItem(this.canonSA[index]);
  }

}
