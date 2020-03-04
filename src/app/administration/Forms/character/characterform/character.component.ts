import { Component, OnInit } from '@angular/core';
import { BirthdayService } from 'src/app/administration/Forms/character/birthday.service';
import { CRUDcontrollerService }        from '../../../services/CRUDcontroller.service'
import { FetchService }                             from 'src/app/GlobalServices/fetch.service';
import { Subscription } from 'rxjs';
import { take, skip } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css', '../../Form.css']
})
export class CharacterComponent implements OnInit {


  stream1: Subscription;
  stream2: Subscription;

  constructor(private controller: CRUDcontrollerService,
              private fetcher: FetchService,
              private birthday: BirthdayService) { }

  ngOnInit() {
    this.stream1 = this.controller.itemToEdit
      .subscribe(item => this.fetcher.assignItemtoEdit(item));
    this.stream2 = this.controller.triggerProcess
      .subscribe(() => this.processForm());
  }

  ngOnDestroy() {
    this.stream1.unsubscribe();
    this.stream2.unsubscribe();
  }
  
  processForm() {
    //Invalid Form
    this.fetcher.fetchData();

    return this.fetcher.activeFormData.pipe(take(1)).subscribe(Final => {
      this.controller.activeFormData.next(Final);
      if(Final[0] !== 'abort') {
          this.birthday.updateBirthdayData(Final[0]);
      }
    });
  }

}
